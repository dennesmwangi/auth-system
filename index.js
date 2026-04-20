import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import os from "os";

//import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://192.168.5.100:3000";

app.disable("x-powered-by");

app.use(
  cors({
    origin: CLIENT_ORIGIN,
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
    server_health: "/health",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "running",
    uptime: process.uptime(),
  });
});

//app.use("/api/auth", authRoutes);

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
  console.log(`- Local:   http://localhost:${PORT}`);
  console.log(`- Network: http://${hostIP}:${PORT}`);
  console.log(`- Client:  ${CLIENT_ORIGIN}`);
});

server.on("error", (error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
