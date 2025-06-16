import { Role } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class RegisterDTO {
  @IsNotEmpty({ message: "O nome é obrigatório!" })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "O email é obrigatório!" })
  @IsEmail({}, { message: "Email inválido!" })
  email: string;

  @IsNotEmpty({ message: "A senha é obrigatória!" })
  @MinLength(6, { message: "A senha precisa ter pelo menos 6 caracteres!" })
  password: string;

  @IsOptional()
  @IsString()
  @IsEnum(Role, { message: "Role inválida!" })
  role?: Role;
}
