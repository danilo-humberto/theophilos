import { IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class VerifyEmailDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(6, 6, { message: "Token deve ter 6 dígitos!" })
  token: string;
}
