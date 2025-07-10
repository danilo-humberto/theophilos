import { useNavigate } from "react-router";
import { getUserData } from "./storage";
import { useEffect } from "react";

const VerificationStorage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserData("user");

    if (user) navigate("/");
  }, [navigate]);

  return null;
};

export default VerificationStorage;
