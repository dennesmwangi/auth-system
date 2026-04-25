import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const location = useLocation();

  let [emailAddress, setEmailAddress] = useState(() => {
    return location.state?.emailAddress || "";
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const normalizedEmail = emailAddress.trim().toLowerCase();

      const res = await axios.post(
        "http://192.168.5.100:5000/api/auth/forgot",
        { emailAddress: normalizedEmail },
      );

      localStorage.setItem("resetEmail", normalizedEmail);
      navigate("/forgot/flow/verify", {
        state: { emailAddress: normalizedEmail },
      });

      toast.success(res.data?.message);
      setEmailAddress("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="card">
        <h2>Forgot Password</h2>
        <p>A reset code will be sent to your email</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>

          <button
            className="btn"
            type="submit"
            disabled={isLoading || !emailAddress.trim()}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
