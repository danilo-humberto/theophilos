import { Role } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "O nome é obrigatório!" })
  name: string;

  @IsEmail({}, { message: "Email inválido!" })
  email: string;

  @MinLength(6, { message: "A senha precisa ter pelo menos 6 caracteres!" })
  password: string;

  @IsOptional()
  @IsEnum(Role, { message: "Role inválida!" })
  role?: Role;
}
