import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO {
  @IsEmail({}, { message: "Email inválido!" })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "A senha precisa ter pelo menos 6 caracteres!" })
  password: string;
}
