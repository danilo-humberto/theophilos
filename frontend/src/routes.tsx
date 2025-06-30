import { Route, Routes } from "react-router";
import Login from "./views/Login";
import Home from "./views/Home";
import Register from "./views/Register";
import VerifyEmail from "./views/Verify-email";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
    </Routes>
  );
};

export default routes;
