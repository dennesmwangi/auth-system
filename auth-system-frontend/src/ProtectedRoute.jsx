import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute() {
  const token = Cookies.get("loginToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
