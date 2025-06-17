import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class UpdateUserDTO {
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;

  @MinLength(6)
  password?: string;

  @IsBoolean()
  isEmailVerified?: boolean;
}
