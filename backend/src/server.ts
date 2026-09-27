import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all origins (localhost, Vercel deployments, mobile apps, etc.)
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Root Health & Welcome
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "online",
    service: "Antivirus Digital E-Commerce & License Key Vault API",
    version: "1.0.0",
    docs: {
      public: "/api",
      admin: "/api/admin",
    },
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` 🛡️  Antivirus API Server is running on port ${PORT}`);
  console.log(` 🌐 Public Storefront API: http://localhost:${PORT}/api`);
  console.log(` 🔐 Admin Panel API:       http://localhost:${PORT}/api/admin`);
  console.log(`====================================================`);
});

export default app;
