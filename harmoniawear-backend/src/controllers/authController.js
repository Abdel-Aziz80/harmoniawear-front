/* eslint-env node */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
  console.warn("[auth] ⚠️ JWT_SECRET non défini (utilise .env)");
}

function sign(user) {
  return jwt.sign(
    { sub: user.id, role: user.role || "CUSTOMER" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// POST /api/auth/register
exports.register = async (req, res) => {
  const { email, password, firstName, lastName, address } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email et mot de passe requis" });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ error: "email déjà utilisé" });

  const hash = await bcrypt.hash(password, 10);

  
  const user = await prisma.user.create({
    data: { email, password: hash, firstName, lastName, address, role: "CUSTOMER" }
  });

  res.json({ token: sign(user), user: { id: user.id, email: user.email, role: user.role || "CUSTOMER" } });
};

// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Identifiants invalides" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Identifiants invalides" });

  res.json({ token: sign(user), user: { id: user.id, email: user.email, role: user.role || "CUSTOMER" } });
};

// GET /api/auth/me  (protégée)
exports.me = async (req, res) => {
  const me = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, firstName: true, lastName: true, address: true, role: true }
  });
  if (!me) return res.status(404).json({ error: "Utilisateur introuvable" });
  res.json(me);
};

// Stubs pour le TP (répondent 204)
exports.forgotPassword = async (_req, res) => res.status(204).end();
exports.resetPassword  = async (_req, res) => res.status(204).end();


// Nouveau : gestion du mot de passe oublié
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: "email requis" });

    const user = await prisma.user.findUnique({ where: { email } });
    // Toujours répondre OK pour ne pas divulguer si un compte existe
    const base = process.env.FRONT_URL || "http://localhost:5173";

    if (user) {
      const token = jwt.sign(
        { id: user.id, action: "reset" },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );
      const url = `${base}/reset-password?token=${encodeURIComponent(token)}`;
      console.log("🔗 Reset link:", url);
      const payload = { ok: true };
      if (process.env.NODE_ENV !== "production") payload.devResetUrl = url;
      return res.json(payload);
    }

    return res.json({ ok: true });
  } catch (e) { next(e); }
};

// Nouveau : réinitialisation du mot de passe
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body || {};
    if (!token || !password) return res.status(400).json({ error: "token et password requis" });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(400).json({ error: "token invalide ou expiré" });
    }
    if (payload.action !== "reset" || !payload.id) {
      return res.status(400).json({ error: "token invalide" });
    }

    const hash = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: payload.id },
      data: { password: hash }
    });

    res.json({ ok: true });
  } catch (e) { next(e); }
};