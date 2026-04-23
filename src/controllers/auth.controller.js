import { createUser, verifyEmailUser } from "../services/auth.service.js";
import { validateRegisterInput } from "../validators/auth.validator.js";
import sendSignupEmail from "../services/email.service.js";
import crypto from "crypto";
import db from "../config/db.js";

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { data, error } = validateRegisterInput(req.body);
    let fullName = `${data.firstName} ${data.lastName}`;

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    let { verificationToken } = await createUser(data);
    let verificationLink = `http://${process.env.CLIENT_ORIGIN}/verify?token=${verificationToken}`;
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
