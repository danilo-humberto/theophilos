import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { LoginDTO } from "./dto/login.dto";
import { RegisterDTO } from "./dto/register.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { MailService } from "src/mail/mail.service";
import { VerificationTokenService } from "src/verification-token/verification-token.service";
import { TokenType } from "@prisma/client";
import { VerifyEmailDTO } from "./dto/verify-email.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private verificationTokenService: VerificationTokenService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmailOrFail(email);

    if (!user.isEmailVerified)
      throw new UnauthorizedException("Email nao verificado!");

    const isValid = await this.userService.checkPassword(user.id, password);
    if (!isValid) throw new UnauthorizedException("Credenciais inválidas!");

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: { id: string; role: string; name: string }) {
    const payload = { sub: user.id, role: user.role, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDTO) {
    const user = await this.userService.create(registerDto);

    const verification = await this.verificationTokenService.generateToken({
      identifier: user.email,
      type: TokenType.EMAIL_VERIFICATION,
      userId: user.id,
      expiresInMinutes: 10,
    });

    await this.mailService.sendVerificationEmail(
      user.email,
      verification.token,
      user.name
    );

    return {
      message:
        "Usuario criado com sucesso. Verifique seu e-mail para ativar sua conta.",
    };
  }

  async verifyEmail({ email, token: code }: VerifyEmailDTO) {
    const token = await this.verificationTokenService.findToken(
      email,
      code,
      TokenType.EMAIL_VERIFICATION
    );

    if (!token) throw new BadRequestException("Token invalido!");
    if (token.expiresAt < new Date())
      throw new BadRequestException("Token expirado!");
    if (!token.userId) throw new BadRequestException("Token invalido!");

    await this.userService.updateUser(token.userId, {
      isEmailVerified: true,
    });

    await this.verificationTokenService.deleteToken(token.id);

    return {
      id: token.userId,
      message: "Email verificado com sucesso!",
    };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.userService.getUserByEmailOrFail(email);

    if (user.isEmailVerified)
      throw new BadRequestException("Email já verificado!");

    await this.verificationTokenService.deleteAllTokensByIdentifierAndType(
      email,
      TokenType.EMAIL_VERIFICATION
    );

    const verification = await this.verificationTokenService.generateToken({
      identifier: email,
      type: TokenType.EMAIL_VERIFICATION,
      userId: user.id,
      expiresInMinutes: 10,
    });

    await this.mailService.sendVerificationEmail(
      email,
      verification.token,
      user.name
    );

    return {
      message:
        "Verificação enviada com sucesso. Verifique seu e-mail para ativar sua conta.",
    };
  }
}
