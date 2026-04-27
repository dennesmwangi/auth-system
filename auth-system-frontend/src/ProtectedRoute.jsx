import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.5.100:5000/api/auth/me", {
        withCredentials: true,
      })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
