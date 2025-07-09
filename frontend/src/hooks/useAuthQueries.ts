import { login, register, verifyEmail } from "@/api/auth-endpoints";
import type { LoginDTO, RegisterDTO, VerifyEmailDTO } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useAuthQueries = () => {
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginDTO) => login(credentials),
  });

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterDTO) => register(userData),
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (credentials: VerifyEmailDTO) => verifyEmail(credentials),
  });

  return {
    loginMutation,
    registerMutation,
    verifyEmailMutation,
  };
};
