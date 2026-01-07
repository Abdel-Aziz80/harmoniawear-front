/* eslint-env node */
const jwt = require("jsonwebtoken");

module.exports = function requireAuth(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Token manquant" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload: { sub, role, iat, exp }
    req.user = { id: payload.sub, role: payload.role || "CUSTOMER" };
    next();
  } catch {
    res.status(401).json({ error: "Token invalide" });
  }
};
