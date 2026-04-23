import bcrypt from "bcryptjs";
import crypto, { sign } from "crypto";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export async function createUser({
  firstName,
  lastName,
  emailAddress,
  password,
}) {
  const [existingUsers] = await db.execute(
    "SELECT id FROM users WHERE email_address = ?",
    [emailAddress],
  );

  if (existingUsers.length > 0) {
    const error = new Error("Email already exists");
    error.code = "EMAIL_EXISTS";
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenHash = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const expiresAt = new Date(Date.now() + 20 * 60 * 1000);

  await db.execute(
    `INSERT INTO users (
      first_name,
      last_name,
      email_address,
      password_hash,
      verification_token_hash,
      verification_token_expires_at
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      firstName,
      lastName,
      emailAddress,
      passwordHash,
      verificationTokenHash,
      expiresAt,
    ],
  );

  return { verificationToken };
}

export async function verifyEmailUser(token) {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const [rows] = await db.execute(
    "SELECT id, verification_token_expires_at FROM users WHERE verification_token_hash = ?",
    [tokenHash],
  );

  /*if (rows.length === 0) {
    return res.status(400).json({ message: "Invalid verification token" });
  }*/

  if (rows.length === 0) {
    const error = new Error("Invalid verification token");
    error.code = "INVALID_TOKEN";
    throw error;
  }

  const user = rows[0];

  if (new Date(user.verification_token_expires_at) < new Date()) {
    const error = new Error("Token has expired");
    error.code = "EXPIRED_TOKEN";
    throw error;
  }

  await db.execute(
    `UPDATE users SET email_address_verified = 1, verification_token_hash = NULL, verification_token_expires_at = NULL WHERE id = ?`,
    [user.id],
  );
  return;
}

export async function logUserIn({ emailAddress, password }) {
  const [rows] = await db.execute(
    "SELECT id, email_address, password_hash FROM users WHERE email_address = ?",
    [emailAddress],
  );

  if (rows.length === 0) {
    const error = new Error("Invalid email or password");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const user = rows[0];

  const comparePassword = await bcrypt.compare(password, user.password_hash);

  if (!comparePassword) {
    const error = new Error("Invalid email or password");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const signToken = (user) => {
    return jwt.sign(
      { id: user.id, email: user.email_address },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
  };

  const token = signToken(user);
  return token;
}
