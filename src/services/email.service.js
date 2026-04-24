import transporter from "./email.transporter.js";
import verifyEmailTemplate from "./templates/verifyEmailTemplate.js";
import { resetCodeTemplate } from "./templates/resetCodeTemplate.js";
import { onboardingTemplate } from "./templates/onboardingTemplate.js";

export const sendSignupEmail = async (
  fullName,
  email,
  verificationLink,
  linkExpirytime,
) => {
  try {
    const html = verifyEmailTemplate(
      fullName,
      verificationLink,
      email,
      linkExpirytime,
    );
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

export const sendResetCodeEmail = async (name, email, code, codeExpirytime) => {
  try {
    const html = resetCodeTemplate(name, code, codeExpirytime, email);
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

export const sendOnboardingEmail = async (name, email) => {
  try {
    const html = onboardingTemplate(name, email);
    await transporter.sendMail({
      from: `"Onboarding Auth System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome onboard, ${name}`,
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send reset code");
  }
};
