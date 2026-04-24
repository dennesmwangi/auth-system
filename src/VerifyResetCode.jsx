import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function VerifyResetCode() {
  const [code, setCode] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedEmail =
      location.state?.emailAddress || localStorage.getItem("resetEmail");

    if (!savedEmail) {
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
      const res = await axios.post(
        "http://192.168.5.100:5000/api/auth/verify-reset-code",
        {
          emailAddress,
          code,
        },
      );

      localStorage.setItem("resetToken", res.data.resetToken);

      toast.success(res.data.message);

      navigate("/forgot/flow/reset", {
        state: { emailAddress },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid code");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="card">
        <h2>Reset Code</h2>
        <p>Code sent to: {emailAddress}</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter reset code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </>
  );
}

export default VerifyResetCode;
