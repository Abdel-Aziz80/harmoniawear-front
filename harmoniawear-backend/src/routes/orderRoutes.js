/* eslint-env node */
const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/requireAuth"); // <— IMPORT de la fonction
const {
  getMyOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

// Optionnel : guard admin
function requireAdmin(req, res, next) {
  return req.user?.role === "ADMIN"
    ? next()
    : res.status(403).json({ error: "Réservé à l'admin" });
}

// Auth obligatoire pour toutes les routes de commande
router.use(requireAuth); // <— on passe la fonction, SANS l'appeler

// GET mes commandes
router.get("/", getMyOrders);

// GET une commande
router.get("/:id", getOrderById);

// POST créer une commande
router.post("/", createOrder);

// PUT changer le statut (admin)
router.put("/:id/status", requireAdmin, updateOrderStatus);

module.exports = router;
