import bcrypt from "bcryptjs";
import crypto from "crypto";
import db from "../config/db.js";

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
