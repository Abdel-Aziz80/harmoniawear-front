/* eslint-env node */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.error("getAllProducts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getProductById(req, res) {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    console.error("getProductById:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createProduct(req, res) {
  try {
    const created = await prisma.product.create({ data: req.body });
    res.status(201).json(created);
  } catch (err) {
    console.error("createProduct:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const updated = await prisma.product.update({ where: { id }, data: req.body });
    res.json(updated);
  } catch (err) {
    console.error("updateProduct:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    console.error("deleteProduct:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
