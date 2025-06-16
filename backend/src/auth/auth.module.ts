import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { PrismaService } from "src/prisma/prisma.service";
import { MailModule } from "src/mail/mail.module";
import { VerificationTokenModule } from "src/verification-token/verification-token.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MailModule,
    VerificationTokenModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, JwtModule, AuthGuard],
})
export class AuthModule {}
