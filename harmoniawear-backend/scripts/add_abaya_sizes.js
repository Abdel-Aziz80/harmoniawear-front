/* eslint-env node */
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ABAYA_SIZES = ["52","54","56","58","60"];

(async () => {
  try {
    const result = await prisma.product.updateMany({
      where: { collection: "muslim", name: { contains: "abaya", mode: "insensitive" } },
      data: { sizes: { set: ABAYA_SIZES } },
    });
    console.log(`✅ Abayas mises à jour: ${result.count}`);
  } catch (e) {
    console.error("❌ Erreur update abaya sizes:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();