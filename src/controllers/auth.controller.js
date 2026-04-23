import {
  createUser,
  verifyEmailUser,
  logUserIn,
} from "../services/auth.service.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../validators/auth.validator.js";
import {
  sendSignupEmail,
  sendResetCodeEmail,
} from "../services/email.service.js";
import crypto from "crypto";
import db from "../config/db.js";
import { response } from "express";

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { data, error } = validateRegisterInput(req.body);

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    const fullName = `${data.firstName} ${data.lastName}`;

    const { verificationToken } = await createUser(data);
    const verificationLink = `http://${process.env.CLIENT_ORIGIN}/verify?token=${verificationToken}`;
    sendSignupEmail(
      `${data.firstName} ${data.lastName}`,
      data.emailAddress,
      verificationLink,
    );

    return res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("registerUser error:", error);

    if (error.code === "EMAIL_EXISTS") {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.body;
  console.log(token);

  try {
    if (!token) {
      return res
        .status(400)
        .json({ message: "Verification token is required" });
    }

    await verifyEmailUser(token);
    return res.status(201).json({
      message: "Verification Successful!",
    });

    //return res.status(200).json({ massage: "Email verified successfully" });
  } catch (error) {
    console.error("Verify user/email error:", error);

    if (error.code === "INVALID_TOKEN") {
      return res.status(400).json({ message: "Invalid verification token" });
    } else if (error.code === "EXPIRED_TOKEN") {
      return res.status(404).json({ message: "Token has expired" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  //const { emailAddress, password } = req.body;

  try {
    const { data, error } = validateLoginInput(req.body);

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    const loginToken = await logUserIn(data);

    res.cookie("loginToken", loginToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
    });

    // await loginUser here
  } catch (error) {
    console.error("loginUser error:", error);

    if (error.code === "INVALID_CREDENTIALS") {
      return res.status(404).json({ message: "Invalid email or password!" });
    } else if (error.code === "UNVERIFIED_EMAIL") {
      return res.status(404).json({
        message:
          "Email not verified. A verification link has been sent. Please check your email.",
      });
    } else if ((error.code = "TOKEN_STILL_VALID")) {
      return res.status(404).json({
        message: "A verification email was already sent. Check your inbox.",
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { emailAddress } = req.body;

  try {
    if (!emailAddress) {
      return res.status(400).json({ message: "Email is required" });
    }

    const [rows] = await db.execute(
      `SELECT id, first_name, last_name FROM users WHERE email_address = ?`,
      [emailAddress],
    );

    if (rows.length === 0) {
      return res.status(200).json({
        message:
          "If an account with that email exists, a reset code has been sent.",
      });
    }

    const user = rows[0];

    const code = crypto.randomInt(100000, 1000000).toString();
    const codeHash = crypto.createHash("sha256").update(code).digest("hex");

    const expiresAt = new Date(Date.now() + 20 * 60 * 1000);

    await db.execute(
      `UPDATE users SET reset_code_hash = ?, reset_code_expires_at = ? WHERE id = ?`,
      [codeHash, expiresAt, user.id],
    );

    // await send code here
    await sendResetCodeEmail(
      `${user.first_name} ${user.last_name}`,
      emailAddress,
      code,
    );

    return res.status(200).json({
      message:
        "If an account with that email exists, a reset code has been sent.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("loginToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
};
