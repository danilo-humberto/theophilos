import api from "./axios";

export const login = async () => {
  const { data } = await api.post("/auth/login");
  return data;
};

export const register = async () => {
  const { data } = await api.post("/auth/register");
  return data;
};

export const verifyEmail = async (code: string) => {
  const { data } = await api.post("/auth/verify-email", { code });
  return data;
};

export const resendVerification = async (email: string) => {
  const { data } = await api.post("/auth/resend-verification", { email });
  return data;
};
