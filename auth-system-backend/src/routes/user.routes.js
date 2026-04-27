import express from "express";
import { auth } from "../auth/auth.js";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

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

router.post("/update", auth, async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  const token = req.cookies.loginToken;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //const userId = req.id;
  const userId = decoded.id;
  //console.log(userId);

  /* return res.status(200).json({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    user_id: userId,
  });*/
  try {
    const [rows] = await db.execute(`SELECT id FROM users WHERE id = ?`, [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = rows[0];

    if (!phoneNumber) {
      await db.execute(
        `UPDATE users SET first_name = ?, last_name = ? WHERE id = ?`,
        [firstName, lastName, userId],
      );
      return res.status(200).json({ message: "Profile updated successfully" });
    } else {
      await db.execute(
        `UPDATE users SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?`,
        [firstName, lastName, phoneNumber, userId],
      );
    }

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {}
});

export default router;
