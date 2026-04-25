import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  //const [emailAddress, setEmailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const emailAddress =
    location.state?.emailAddress || localStorage.getItem("resetEmail") || "";

  useEffect(() => {
    const resetToken = localStorage.getItem("resetToken");

    if (!emailAddress || !resetToken) {
      toast.error("Invalid request. Please start the reset process again.");
      navigate("/forgot");
      return;
    }
  }, [emailAddress, navigate]);

  const checkPasswordStrength = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isStrong =
      minLength <= password.length &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSpecialChar;
    return isStrong;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedNewPassword = newPassword.trim();
    const normalizedConfirmPassword = confirmPassword.trim();

    if (normalizedNewPassword !== normalizedConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!checkPasswordStrength(normalizedNewPassword)) {
      toast.error("Password does not meet strength requirements");
      return;
    }

    try {
      setIsLoading(true);
      const resetToken = localStorage.getItem("resetToken");

      const res = await axios.post(
        "http://192.168.5.100:5000/api/auth/reset-password",
        {
          emailAddress,
          resetToken,
          newPassword: normalizedNewPassword,
        },
      );

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetToken");

      toast.success(res.data?.message || "Password reset successfully");
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response?.data?.message || "Failed to reset password",
        );
        navigate("/forgot");
        return;
      } else if (error.request) {
        toast.error("Network error. That's all we know.");
        return;
      } else {
        toast.error("Something went wrong");
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="card">
        <h2>Set New Password</h2>
        <p>Password Must:</p>
        <ul
          style={{ marginLeft: "20px", marginBottom: "20px", fontSize: "14px" }}
        >
          <li className="form-list-item">Be at least 8 characters long</li>
          <li className="form-list-item">Contain an uppercase letter</li>
          <li className="form-list-item">Contain a lowercase letter</li>
          <li className="form-list-item">Contain a digit</li>
          <li className="form-list-item">Contain a special character</li>
        </ul>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              required
              minLength={8}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className="btn"
            type="submit"
            disabled={isLoading || !newPassword || !confirmPassword}
          >
            {isLoading ? "Resetting ..." : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
