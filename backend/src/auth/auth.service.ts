import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { LoginDTO } from "./dto/login.dto";
import { RegisterDTO } from "./dto/register.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { MailService } from "src/mail/mail.service";
import { VerificationTokenService } from "src/verification-token/verification-token.service";
import { TokenType } from "@prisma/client";

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
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDTO) {
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDTO) {
    const hasEmail = await this.userService.getUserByEmail(registerDto.email);

    if (hasEmail) {
      throw new ConflictException("Email ja cadastrado!");
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: registerDto.role,
    });

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
      // id: user.id,
      // name: user.name,
      // email: user.email,
      // createdAt: user.createdAt,
      message:
        "Usuario criado com sucesso. Verifique seu e-mail para ativar sua conta.",
    };
  }
}
