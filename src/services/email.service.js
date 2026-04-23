import transporter from "./email.transporter.js";
import verifyEmailTemplate from "./templates/verifyEmailTemplate.js";
import { resetCodeTemplate } from "./templates/resetCodeTemplate.js";

export const sendSignupEmail = async (fullName, email, verificationLink) => {
  try {
    const html = verifyEmailTemplate(fullName, verificationLink);
    await transporter.sendMail({
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your Email",
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send signup email");
  }
};

export const sendResetCodeEmail = async (name, email, code) => {
  try {
    const html = resetCodeTemplate(name, code);
    await transporter.sendMail({
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Password Reset Code",
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send reset code");
  }
};
