import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://192.168.5.100:5000/api/auth/register",
        {
          firstName,
          lastName,
          emailAddress,
          password,
        },
      );
      toast.success(res.data?.message || "Registration successful");
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      } else if (error.request) {
        toast.error(
          "Network error. Please check your connection and try again.",
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="card">
        <h2>Sign up</h2>
        <p>Create your free account</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>First name</label>
            <input
              type="text"
              placeholder="Enter your First name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Last name</label>
            <input
              type="text"
              placeholder="Enter your Last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="row">
            <p>
              By signing up you agree to our{" "}
              <Link to="/tos">Terms and Conditions</Link>
            </p>
          </div>

          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>

          <div className="footer">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
