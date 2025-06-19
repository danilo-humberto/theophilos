import { IsInt, IsNotEmpty, IsUUID, Min } from "class-validator";

export class CreateRaffleSaleDTO {
  @IsUUID()
  @IsNotEmpty({ message: "O ID da rifa é obrigatório!" })
  raffleId: string;
}
