/* eslint-env node */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

function frontURL() {
  return process.env.FRONT_URL || "http://localhost:4000";
}

// POST /api/auth/request-reset  { email }
exports.requestReset = async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: "email requis" });

    const user = await prisma.user.findUnique({ where: { email } });
    // Ne révèle pas si l'email existe ou non
    if (!user) return res.json({ ok: true, message: "Si le compte existe, un lien a été envoyé." });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    await prisma.passwordReset.create({
      data: { userId: user.id, token, expiresAt },
    });

    const url = `${frontURL()}/reset-password?token=${encodeURIComponent(token)}`;
    // Pour le TP : on log le lien (en prod: envoi email)
    console.log("🔑 Lien de réinitialisation:", url);

    res.json({ ok: true, message: "Lien de réinitialisation envoyé.", resetUrl: url });
  } catch (e) { next(e); }
};

// POST /api/auth/reset  { token, password }
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body || {};
    if (!token || !password) return res.status(400).json({ error: "token et mot de passe requis" });

    const rec = await prisma.passwordReset.findFirst({
      where: { token },
    });
    if (!rec || rec.expiresAt < new Date()) {
      return res.status(400).json({ error: "Lien invalide ou expiré" });
    }

    const hash = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: rec.userId },
      data: { password: hash },
    });

    // Nettoyage du jeton
    await prisma.passwordReset.delete({ where: { id: rec.id } });

    res.json({ ok: true, message: "Mot de passe réinitialisé." });
  } catch (e) { next(e); }
};
