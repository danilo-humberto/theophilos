import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { RegisterDTO } from "./dto/register.dto";
import { VerifyEmailDTO } from "./dto/verify-email.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("login")
  async login(@Body() body: LoginDTO) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas!");
    }

    return this.authService.login(user);
  }

  @Post("register")
  async register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }

  @HttpCode(200)
  @Post("verify-email")
  async verifyEmail(@Body() body: VerifyEmailDTO) {
    return this.authService.verifyEmail(body);
  }
}
