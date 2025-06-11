import { Module } from "@nestjs/common";
import { RaffleController } from "./raffle.controller";
import { RaffleService } from "./raffle.service";
import { UsersModule } from "src/users/users.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [UsersModule],
  controllers: [RaffleController],
  providers: [RaffleService, PrismaService],
  exports: [],
})
export class RaffleModule {}
