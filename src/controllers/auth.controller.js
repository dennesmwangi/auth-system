import { createUser } from "../services/auth.service.js";
import { validateRegisterInput } from "../validators/auth.validator.js";

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { data, error } = validateRegisterInput(req.body);

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    let { verificationToken } = await createUser(data);
    console.log(verificationToken);

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
