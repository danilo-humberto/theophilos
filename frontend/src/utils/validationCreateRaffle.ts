import { z } from "zod";

export const createRaffleSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "O preço é obrigatório"),
  quantity: z.coerce.number().min(1, "A quantidade é obrigatória"),
  pixKey: z.string().min(1, "A chave pix é obrigatória"),
  endDate: z.date().min(new Date(), "A data de encerramento deve ser futura!"),
  imageUrl: z
    .any()
    .refine((file) => file instanceof File, "A imagem é obrigatória")
    .refine(
      (file: File) => file?.size <= 3 * 1024 * 1024,
      "O arquivo deve ter no máximo 3MB"
    )
    .refine(
      (file: File) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file?.type
        ),
      "O arquivo deve ser .jpg, .jpeg, .png ou .webp"
    ),
});

export type CreateRaffleSchema = z.infer<typeof createRaffleSchema>;
