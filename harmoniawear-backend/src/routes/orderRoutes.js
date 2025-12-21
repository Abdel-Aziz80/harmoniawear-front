/* eslint-env node */
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { requireAuth } = require("../middlewares/requireAuth");

// Toutes les routes nécessitent l'authentification
router.use(requireAuth);

router.get("/", orderController.getMyOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.put("/:id/status", orderController.updateOrderStatus);


module.exports = router;
