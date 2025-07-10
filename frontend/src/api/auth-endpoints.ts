import type {
  AuthResponse,
  LoginDTO,
  RegisterDTO,
  ResendVerificationEmail,
  VerifyEmailDTO,
} from "../types/auth";
import api from "./axios";

export const login = async (credentials: LoginDTO): Promise<AuthResponse> => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const register = async (
  userData: RegisterDTO
): Promise<AuthResponse> => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

export const verifyEmail = async (credentials: VerifyEmailDTO) => {
  const { data } = await api.post("/auth/verify-email", credentials);
  return data;
};

export const resendVerification = async (email: ResendVerificationEmail) => {
  const { data } = await api.post("/auth/resend-verification", email);
  return data;
};
