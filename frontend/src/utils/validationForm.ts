import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
    password: z
      .string()
      .min(6)
      .regex(
        /[a-zA-Z][0-9]/,
        "A senha precisa conter, no mínimo 6 caracters, com letras e números"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
