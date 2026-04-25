import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
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
          <Route path="/forgot/flow/verify" element={<VerifyResetCode />} />
          <Route path="/forgot/flow/reset" element={<ResetPassword />} />
          <Route path="/my/account" element={<Dashboard />} />
          <Route path="/tos" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
