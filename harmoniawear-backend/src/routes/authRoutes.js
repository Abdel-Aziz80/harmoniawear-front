/* eslint-env node */
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  me,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// middleware d’auth (export par défaut, ne PAS appeler requireAuth())
const requireAuth = require("../middlewares/requireAuth");

// petit helper pour capturer les erreurs async et passer à next()
const aw = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Publiques
router.post("/register", aw(register));
router.post("/login",    aw(login));

// Protégée
router.get("/me", requireAuth, aw(me));

// Mot de passe oublié / reset (stubs)
router.post("/forgot-password", aw(forgotPassword));
router.post("/reset-password",  aw(resetPassword));

module.exports = router;
