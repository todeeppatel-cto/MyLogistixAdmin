const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ---- Basics / middleware ----
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Vercel invokes this handler for /api/* routes; strip the prefix so backend routes don't need changing.
app.use((req, _res, next) => {
  if (typeof req.url === "string" && req.url.startsWith("/api")) {
    req.url = req.url.slice(4) || "/";
  }
  next();
});

// Serve committed static assets (read-only on Vercel, but fine for serving).
app.use(
  "/invoices",
  express.static(path.join(__dirname, "..", "backend", "invoices"))
);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "backend", "uploads"))
);

// ---- MongoDB connection (cached across invocations) ----
async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }
  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10_000,
  });
}

app.use(async (req, res, next) => {
  // Only connect for API requests that actually need DB; keep health fast.
  if (req.path === "/health") return next();
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// ---- Routes ----
const userRoutes = require("../backend/routes/userRoutes");
const Routes = require("../backend/routes/route.js");
const fileRoutes = require("../backend/routes/fileRoutes.js");
const rateRoutes = require("../backend/routes/rateRoutes.js");
const orderRoutes = require("../backend/routes/orderRoutes.js");
const companyRateRoutes = require("../backend/routes/companyRateRoutes.js");

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "MyLogistix API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/", Routes);
app.use("/", userRoutes);
app.use("/", fileRoutes);
app.use("/", rateRoutes);
app.use("/createorder", orderRoutes);
app.use("/", companyRateRoutes);

// ---- Error handling ----
app.use((err, _req, res, _next) => {
  console.error("API error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message,
  });
});

module.exports = app;
