/* eslint-env node */
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();

// --- CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONT_URL,
].filter(Boolean);
app.use(cors({ origin: allowedOrigins, credentials: true }));

// --- Body parser (AVANT les routes !)
app.use(express.json({ limit: "1mb" }));

// --- Health
app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// --- API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// --- (Optionnel) servir le front Vite en prod
const FRONT_DIR = path.join(__dirname, "..", "dist");
app.use(express.static(FRONT_DIR));
app.get(/^(?!\/api|\/health).*/, (_req, res) => {
  res.sendFile(path.join(FRONT_DIR, "index.html"));
});

// --- 404 + erreurs
app.use((req, res) => res.status(404).json({ error: "Not Found", path: req.originalUrl }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
process.on('unhandledRejection', (e) => {
  console.error('UNHANDLED REJECTION', e);
});
process.on('uncaughtException', (e) => {
  console.error('UNCAUGHT EXCEPTION', e);
});
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
