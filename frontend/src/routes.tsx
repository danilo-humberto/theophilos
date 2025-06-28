import { Route, Routes } from "react-router";
import Login from "./views/Login";
import Home from "./views/Home";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
      <Route path="/verify-email" element={<Login />} />
    </Routes>
  );
};

export default routes;
