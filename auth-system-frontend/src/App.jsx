import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";
import VerifyResetCode from "./VerifyResetCode";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";
import TermsOfService from "./TermsOfService";
import NotFound from "./NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/verify-reset-code" element={<VerifyResetCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path="/tos" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
