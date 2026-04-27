import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function VerifyResetCode() {
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const emailAddress =
    location.state?.emailAddress || localStorage.getItem("resetEmail") || "";

  useEffect(() => {
    if (!emailAddress) {
      toast.error("Invalid request. Please start the reset process again.");
      navigate("/forgot", { replace: true });
    }
  }, [emailAddress, navigate]);

  if (!emailAddress) return null;

  const maskedEmail = emailAddress.replace(
    /(^.).*(@.*$)/,
    (_, a, b) => `${a}***${b}`,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedCode = code.trim();

    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/verify-reset-code", {
        emailAddress,
        code: normalizedCode,
      });

      localStorage.setItem("resetToken", res.data.resetToken);

      toast.success(res.data.message || "Code verified.");

      navigate("/reset-password", {
        state: { emailAddress },
      });
    } catch (error) {
      if (error.response) {
        if (error.response.data.error_code === "EXPIRED") {
          toast.error(
            error.response?.data?.message ||
              "Code expired. Please request a new one.",
          );
          navigate("/forgot", {
            state: { emailAddress },
            replace: true,
          });
          return;
        } else {
          toast.error(error.response?.data?.message || "Invalid request.");
        }

        return;
      } else if (error.request) {
        toast.error("Network error.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Reset Code</h2>
      <p>
        Code was sent to: <b>{maskedEmail}</b>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter reset code"
            required
            value={code}
            disabled={isLoading}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <button
          className="btn"
          type="submit"
          disabled={isLoading || !code.trim()}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
}

export default VerifyResetCode;
