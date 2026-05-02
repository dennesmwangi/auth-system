import dotenv from "dotenv";
dotenv.config();
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import os from "os";
import cookieParser from "cookie-parser";
import db from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import { json } from "stream/consumers";

const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth System API",
      version: "1.0.0",
      description: "Auth System API documentation",
    },
    servers: [
      {
        url: "http://127.0.0.1:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

app.disable("x-powered-by");
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    name: "auth-system-backend",
    version: "1.0.0",
    description: "Auth System Project(backend)",
    status: "running",
    uptime: process.uptime(),
  });
});

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

const server = app.listen(PORT, HOST, () => {
  const hostIP = process.env.HOST_IP;

  console.log("Server running:");
  console.log(`- IP:   http://${HOST}:${PORT}`);
});

server.on("error", (error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
