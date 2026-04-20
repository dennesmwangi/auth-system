import db from "../config/db.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const saltRounds = 10;

// Register user
export const registerUser = async (req, res) => {
  let { firstName, lastName, emailAddress, password } = req.body;

  try {
    firstName = firstName?.trim();
    lastName = lastName?.trim();
    emailAddress = emailAddress?.trim();
    password = password?.trim();

    if (!firstName) {
      return res.status(400).json({ message: "First name is required" });
    }

    if (!lastName) {
      return res.status(400).json({ message: "Last name is required" });
    }

    if (!emailAddress) {
      return res.status(400).json({ message: "Email address is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password cannot be empty" });
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      });
    }

    // check if email already exists
    const [rows] = await db.execute(
      "SELECT id FROM users WHERE email_address = ?",
      [emailAddress],
    );

    if (rows.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const verificationTokenHash = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 20 * 60 * 1000);

    const [newUser] = await db.execute(
      "INSERT INTO users (first_name, last_name, email_address, password_hash, verification_token_hash, verification_token_expires_at ) VALUES (?, ?, ?, ?, ?, ?)",
      [
        firstName,
        lastName,
        emailAddress,
        passwordHash,
        verificationTokenHash,
        expiresAt,
      ],
    );

    // send verification email here

    return res.status(201).json({
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
