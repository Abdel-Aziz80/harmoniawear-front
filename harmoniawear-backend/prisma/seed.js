/* eslint-env node */
// harmoniawear-backend/prisma/seed.js
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log(" Début du seed...");

  // Vérifier si des produits existent déjà
  const productCount = await prisma.product.count();
  if (productCount > 0) {
    console.log(`⚠️  Seed ignoré : ${productCount} produit(s) déjà présent(s).`);
    console.log("💡 Pour reseed, supprimez d'abord les données existantes.");
    return;
  }

  // 1) Utilisateur admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@harmoniawear.com" },
    update: {},
    create: {
      email: "admin@harmoniawear.com",
      password: adminPassword,
      firstName: "Admin",
      lastName: "HarmoniaWear",
      address: "Siège social HarmoniaWear",
      role: "ADMIN"
    },
  });
  console.log("✅ Admin créé:", admin.email);

  // 2) Utilisateur client de démo
  const demoPassword = await bcrypt.hash("demo123", 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@harmoniawear.com" },
    update: {},
    create: {
      email: "demo@harmoniawear.com",
      password: demoPassword,
      firstName: "Client",
      lastName: "Démo",
      address: " 9 Rue Prévost 76410 Saint Aubin Les Elbeuf",
      role: "CUSTOMER"
    },
  });
  console.log("✅ Utilisateur démo créé:", demoUser.email);

  // 3) Produits de démo - Collection variée
  const productsData = [
    // FEMME - STREETWEAR
    {
      name: "T-shirt Oversized Femme",
      description: "T-shirt oversized en coton bio, coupe décontractée parfaite pour le streetwear urbain.",
      price: 24.99,
      category: "femme",
      collection: "streetwear",
      images: ["https://picsum.photos/seed/tshirt-femme-1/800/800"],
      stock: 150,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Noir", "Blanc", "Beige"]
    },
    {
      name: "Hoodie Crop Femme",
      description: "Sweat à capuche court, idéal pour un look streetwear moderne.",
      price: 49.99,
      category: "femme",
      collection: "streetwear",
      images: ["https://picsum.photos/seed/hoodie-femme-1/800/800"],
      stock: 80,
      sizes: ["S", "M", "L"],
      colors: ["Rose", "Gris", "Noir"]
    },
    {
      name: "Jogger Femme Urban",
      description: "Pantalon jogger confortable avec poches latérales.",
      price: 39.99,
      category: "femme",
      collection: "streetwear",
      images: ["https://picsum.photos/seed/jogger-femme-1/800/800"],
      stock: 100,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Noir", "Kaki", "Gris"]
    },

    // FEMME - SPORTSWEAR
    {
      name: "Legging Sport Femme",
      description: "Legging haute compression, évacuation de l'humidité.",
      price: 34.99,
      category: "femme",
      collection: "sportswear",
      images: ["https://picsum.photos/seed/legging-sport-1/800/800"],
      stock: 120,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Noir", "Bleu marine", "Bordeaux"]
    },
    {
      name: "Brassière Sport Pro",
      description: "Maintien optimal pour activités intensives.",
      price: 29.99,
      category: "femme",
      collection: "sportswear",
      images: ["https://picsum.photos/seed/brassiere-1/800/800"],
      stock: 90,
      sizes: ["S", "M", "L"],
      colors: ["Noir", "Rose", "Turquoise"]
    },

    // FEMME - MATERNITY
    {
      name: "Legging Maternity Confort",
      description: "Legging de maternité avec bande élastique douce.",
      price: 39.99,
      category: "femme",
      collection: "maternity",
      images: ["https://picsum.photos/seed/maternity-legging-1/800/800"],
      stock: 60,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Noir", "Gris"]
    },
    {
      name: "Top Maternity Allaitement",
      description: "Top pratique avec ouverture discrète pour l'allaitement.",
      price: 32.99,
      category: "femme",
      collection: "maternity",
      images: ["https://picsum.photos/seed/maternity-top-1/800/800"],
      stock: 50,
      sizes: ["S", "M", "L"],
      colors: ["Blanc", "Rose pâle", "Beige"]
    },

    // FEMME - MUSLIM
    {
      name: "Abaya Moderne",
      description: "Abaya élégante, coupe moderne et confortable.",
      price: 59.99,
      category: "femme",
      collection: "muslim",
      images: ["https://picsum.photos/seed/abaya-1/800/800"],
      stock: 40,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Noir", "Bleu marine", "Beige"]
    },
    {
      name: "Hijab Sport Respirant",
      description: "Hijab technique pour le sport, tissu respirant.",
      price: 19.99,
      category: "femme",
      collection: "muslim",
      images: ["https://picsum.photos/seed/hijab-sport-1/800/800"],
      stock: 100,
      sizes: ["M"],
      colors: ["Noir", "Gris", "Blanc"]
    },

    // HOMME - STREETWEAR
    {
      name: "T-shirt HW Essential Homme",
      description: "T-shirt en coton peigné premium, logo discret.",
      price: 19.99,
      category: "homme",
      collection: "streetwear",
      images: ["https://picsum.photos/seed/tshirt-homme-1/800/800"],
      stock: 200,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Noir", "Blanc", "Gris"]
    },
    {
      name: "Hoodie Classic Homme",
      description: "Sweat à capuche molleton brossé, coupe unisexe.",
      price: 54.99,
      category: "homme",
      collection: "streetwear",
      images: ["https://picsum.photos/seed/hoodie-homme-1/800/800"],
      stock: 100,
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Noir", "Gris", "Marine"]
    },
    {
      name: "Jogger Street Homme",
      description: "Pantalon jogger style urbain, poches cargo.",
      price: 44.99,
      category: "homme",
      collection: "streetwear",
      images: ["https://picsum.photos/seed/jogger-homme-1/800/800"],
      stock: 110,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Noir", "Kaki", "Gris foncé"]
    },

    // HOMME - SPORTSWEAR
    {
      name: "Short Sport Homme",
      description: "Short de sport léger, poches zippées.",
      price: 29.99,
      category: "homme",
      collection: "sportswear",
      images: ["https://picsum.photos/seed/short-sport-homme-1/800/800"],
      stock: 150,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Noir", "Bleu", "Gris"]
    },
    {
      name: "T-shirt Technique Homme",
      description: "T-shirt respirant pour le sport, séchage rapide.",
      price: 24.99,
      category: "homme",
      collection: "sportswear",
      images: ["https://picsum.photos/seed/tshirt-technique-1/800/800"],
      stock: 180,
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Noir", "Bleu", "Rouge"]
    },

    // HOMME - MUSLIM
    {
      name: "Thobe Classique",
      description: "Thobe traditionnel, tissu de qualité premium.",
      price: 69.99,
      category: "homme",
      collection: "muslim",
      images: ["https://picsum.photos/seed/thobe-1/800/800"],
      stock: 50,
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Blanc", "Beige", "Gris"]
    },
    {
      name: "Qamis Moderne",
      description: "Qamis coupe moderne, col mandarin.",
      price: 54.99,
      category: "homme",
      collection: "muslim",
      images: ["https://picsum.photos/seed/qamis-1/800/800"],
      stock: 60,
      sizes: ["M", "L", "XL"],
      colors: ["Blanc", "Noir", "Kaki"]
    },

    // ENFANT - STREETWEAR
    {
      name: "T-shirt Enfant Cool",
      description: "T-shirt en coton doux pour enfants.",
      price: 14.99,
      category: "enfant",
      collection: "streetwear",
      images: ["https://picsum.photos/seed/tshirt-enfant-1/800/800"],
      stock: 120,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Noir", "Blanc", "Rouge"]
    },
    {
      name: "Hoodie Enfant Urban",
      description: "Sweat à capuche confortable pour les kids.",
      price: 34.99,
      category: "enfant",
      collection: "streetwear",
      images: ["https://picsum.photos/seed/hoodie-enfant-1/800/800"],
      stock: 80,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Gris", "Bleu", "Rose"]
    },

    // ENFANT - SPORTSWEAR
    {
      name: "Ensemble Sport Enfant",
      description: "Ensemble t-shirt + short pour le sport.",
      price: 29.99,
      category: "enfant",
      collection: "sportswear",
      images: ["https://picsum.photos/seed/ensemble-sport-enfant-1/800/800"],
      stock: 70,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Bleu", "Vert", "Rouge"]
    },
    {
      name: "Legging Sport Enfant",
      description: "Legging confortable pour les activités des enfants.",
      price: 19.99,
      category: "enfant",
      collection: "sportswear",
      images: ["https://picsum.photos/seed/legging-enfant-1/800/800"],
      stock: 90,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Noir", "Rose", "Bleu"]
    }
  ];

  console.log(`📦 Création de ${productsData.length} produits...`);
  await prisma.product.createMany({ data: productsData });
  console.log("✅ Produits créés avec succès!");

  // 4) Créer une commande de démo pour l'utilisateur démo
  const [p1, p2, p3] = await prisma.product.findMany({
    orderBy: { id: "asc" },
    take: 3,
  });

  if (p1 && p2 && p3) {
    const order = await prisma.order.create({
      data: {
        userId: demoUser.id,
        shippingAddress: "12 Rue de la Mode, 75000 Paris",
        status: "pending",
        total: p1.price * 2 + p2.price * 1 + p3.price * 1,
        items: {
          create: [
            { productId: p1.id, quantity: 2, price: p1.price },
            { productId: p2.id, quantity: 1, price: p2.price },
            { productId: p3.id, quantity: 1, price: p3.price },
          ],
        },
      },
      include: { items: true },
    });
    console.log("✅ Commande de démo créée, ID:", order.id);
  }

  console.log("\n Seed terminé avec succès!");
  console.log("\n Informations de connexion:");
  console.log("   Admin: admin@harmoniawear.com / admin123");
  console.log("   Démo:  demo@harmoniawear.com / demo123");
}

main()
  .catch((err) => {
    console.error("❌ Erreur seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
