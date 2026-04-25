import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  //dev
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    if (!token) {
      navigate("/");
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.post(
          "http://192.168.5.100:5000/api/auth/verify",
          {
            token,
          },
        );
        toast.success(res.data?.message || "Email verification successful");

        navigate("/"); // success redirect
      } catch (error) {
        toast.error(error.response?.data?.message);
        navigate("/");
      }
    };

    verify();
  }, [token, navigate]);

  return <div>Verifying your email...</div>;
}

export default VerifyEmail;
