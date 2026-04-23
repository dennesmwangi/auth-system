import express from "express";
import { auth } from "../auth/auth.js";
import db from "../config/db.js";

const router = express.Router();

router.get("/dashboard", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    res.json({
      message: "Welcome",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
