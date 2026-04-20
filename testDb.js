import dotenv from "dotenv";
dotenv.config();

import pool from "./src/config/db.js";

async function testConnection() {
  try {
    // Basic env validation
    const required = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
    for (const key of required) {
      if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
      }
    }

    console.log("Testing database connection...");

    // Get a connection from pool
    const connection = await pool.getConnection();

    // Simple query
    const [rows] = await connection.query("SELECT 1 AS result");

    console.log("Connection successful");
    console.log("Test query result:", rows[0]);

    connection.release();
    process.exit(0);
  } catch (error) {
    console.error("Database connection failed");
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();
