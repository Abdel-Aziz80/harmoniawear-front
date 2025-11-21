/* eslint-env node */
// harmoniawear-backend/prisma/seed.js
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Empêche le reseed si des produits existent déjà
  const count = await prisma.product.count();
  if (count > 0) {
    console.log(`Seed ignoré : ${count} produit(s) déjà présent(s).`);
    return;
  }

  // 1) Utilisateur de démo (upsert par email)
  const user = await prisma.user.upsert({
    where: { email: "demo@harmoniawear.com" },
    update: {},
    create: {
      email: "demo@harmoniawear.com",
      password: "demo123", // dev uniquement
      firstName: "Harmonia",
      lastName: "Wear",
      address: "12 Rue de la Mode, 75000 Paris",
    },
  });

  // 2) Produits de démo
  const productsData = [
    {
      name: "T-shirt HW Essential",
      description: "Coton peigné premium.",
      price: 19.99,
      category: "homme",
      collection: "streetwear",
      images: ["https://picsum.photos/id/1011/800/800"],
      stock: 120,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Noir", "Blanc"],
    },
    {
      name: "Hoodie HW Classic",
      description: "Molleton brossé, coupe unisexe.",
      price: 49.99,
      category: "femme",
      collection: "sportswear",
      images: ["https://picsum.photos/id/1015/800/800"],
      stock: 80,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Rouge", "Noir"],
    },
    {
      name: "Legging Maternity Fit",
      description: "Maintien doux pour la maternité.",
      price: 39.9,
      category: "femme",
      collection: "maternity",
      images: ["https://picsum.photos/id/1027/800/800"],
      stock: 60,
      sizes: ["S", "M", "L"],
      colors: ["Noir"],
    },
    {
      name: "Jogger Street",
      description: "Confort et style urbain.",
      price: 34.5,
      category: "homme",
      collection: "streetwear",
      images: ["https://picsum.photos/id/1033/800/800"],
      stock: 100,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Gris", "Noir"],
    },
    {
      name: "Brassière Sport Pro",
      description: "Maintien renforcé.",
      price: 29.0,
      category: "femme",
      collection: "sportswear",
      images: ["https://picsum.photos/id/1043/800/800"],
      stock: 70,
      sizes: ["S", "M", "L"],
      colors: ["Noir", "Rose"],
    },
    {
      name: "Chemise Oversize",
      description: "Coupe moderne, tissu respirant.",
      price: 44.0,
      category: "homme",
      collection: "streetwear",
      images: ["https://picsum.photos/id/1053/800/800"],
      stock: 50,
      sizes: ["M", "L", "XL"],
      colors: ["Blanc", "Bleu"],
    },
  ];

  await prisma.product.createMany({ data: productsData });

  // 3) Une commande de démo avec 2 articles
  const [p1, p2] = await prisma.product.findMany({
    orderBy: { id: "asc" },
    take: 2,
  });

  if (p1 && p2) {
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        shippingAddress: "12 Rue de la Mode, 75000 Paris",
        status: "pending",
        total: p1.price * 1 + p2.price * 2, // Float: OK pour le dev actuel
        items: {
          create: [
            { productId: p1.id, quantity: 1, price: p1.price },
            { productId: p2.id, quantity: 2, price: p2.price },
          ],
        },
      },
      include: { items: true },
    });
    console.log("Seed OK → order id:", order.id);
  } else {
    console.log("Produits créés, pas assez pour créer une commande.");
  }
}

main()
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
