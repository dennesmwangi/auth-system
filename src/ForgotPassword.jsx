import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [emailAddress, setEmailAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://192.168.5.100:5000/api/auth/forgot",
        { emailAddress },
      );

      localStorage.setItem("resetEmail", emailAddress);

      toast.success(res.data?.message);
      navigate("/forgot/flow/verify", { state: { emailAddress } });
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
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
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

export default ForgotPassword;
