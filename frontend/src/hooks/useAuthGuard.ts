import { isTokenExpired } from "@/utils/isTokenExpired";
import { getUserData, removeUserData } from "@/utils/storage";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useAuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authData = getUserData("user");
    if (!authData) return;

    const { access_token } = authData;

    if (isTokenExpired(access_token)) {
      toast.error("Sua sessão expirou, faca login novamente.");
      removeUserData("user");
      navigate("/login");
    }
  }, [navigate]);
};
