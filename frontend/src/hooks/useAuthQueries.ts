import {
  login,
  register,
  verifyEmail,
  resendVerification,
} from "@/api/auth-endpoints";
import type {
  LoginDTO,
  RegisterDTO,
  ResendVerificationEmail,
  VerifyEmailDTO,
} from "@/types/auth";
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

  const resendVerificationEmail = useMutation({
    mutationFn: (email: ResendVerificationEmail) => resendVerification(email),
  });

  return {
    loginMutation,
    registerMutation,
    verifyEmailMutation,
    resendVerificationEmail,
  };
};
