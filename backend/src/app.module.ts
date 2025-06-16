import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { NumbersModule } from "./numbers/numbers.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RaffleSaleModule } from "./raffle-sale/raffle-sale.module";
import { RaffleModule } from "./raffle/raffle.module";
import { UsersModule } from "./users/users.module";
import { VerificationTokenModule } from "./verification-token/verification-token.module";

@Module({
  imports: [
    VerificationTokenModule,
    MailModule,
    NumbersModule,
    RaffleSaleModule,
    RaffleModule,
    UsersModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
