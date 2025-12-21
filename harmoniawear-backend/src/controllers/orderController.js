/* eslint-env node */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/orders - Récupérer les commandes de l'utilisateur connecté
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    res.json(orders);
  } catch (e) {
    next(e);
  }
};

// GET /api/orders/:id - Récupérer une commande spécifique
exports.getOrderById = async (req, res, next) => {
  try {
    const orderId = Number(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: "Commande introuvable" });
    }

    // Vérifier que la commande appartient à l'utilisateur (sauf si admin)
    if (order.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Accès refusé" });
    }

    res.json(order);
  } catch (e) {
    next(e);
  }
};

// POST /api/orders - Créer une nouvelle commande
exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Le panier est vide" });
    }

    if (!shippingAddress || !shippingAddress.trim()) {
      return res.status(400).json({ error: "Adresse de livraison requise" });
    }

    // Calculer le total
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (!product) {
        return res.status(404).json({ 
          error: `Produit ${item.productId} introuvable` 
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Stock insuffisant pour ${product.name}` 
        });
      }

      total += product.price * item.quantity;
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Créer la commande avec les items
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        total,
        shippingAddress: shippingAddress.trim(),
        status: "pending",
        items: {
          create: orderItems
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Mettre à jour le stock des produits
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
};

// PUT /api/orders/:id/status - Mettre à jour le statut d'une commande (ADMIN)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = Number(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Statut requis" });
    }

    const validStatuses = ["pending", "confirmed", "shipped", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Statut invalide" });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    res.json(order);
  } catch (e) {
    next(e);
  }
};
