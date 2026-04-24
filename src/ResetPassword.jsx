import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const [emailAddress, setEmailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedEmail =
      location.state?.emailAddress || localStorage.getItem("resetEmail");

    const resetToken = localStorage.getItem("resetToken");

    if (!savedEmail || !resetToken) {
      toast.error("Reset session expired. Start again.");
      navigate("/forgot");
      return;
    }

    setEmailAddress(savedEmail);
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const resetToken = localStorage.getItem("resetToken");

      const res = await axios.post(
        "http://192.168.5.100:5000/api/auth/reset-password",
        {
          emailAddress,
          resetToken,
          newPassword,
        },
      );

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetToken");

      toast.success(res.data.message || "Password reset successful");
      navigate("/");
    } catch (error) {
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetToken");

      navigate("/forgot");

      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="card">
        <h2>Set New Password</h2>
        <p>Enter your new password below</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              required
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Resetting ..." : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
