import transporter from "./email.transporter.js";
import verifyEmailTemplate from "./templates/verifyEmailTemplate.js";

const sendSignupEmail = async (fullName, email, verificationLink) => {
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

export default sendSignupEmail;
