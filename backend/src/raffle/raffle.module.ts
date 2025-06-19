import { forwardRef, Module } from "@nestjs/common";
import { RaffleController } from "./raffle.controller";
import { RaffleService } from "./raffle.service";
import { UsersModule } from "src/users/users.module";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [forwardRef(() => UsersModule), PrismaModule],
  controllers: [RaffleController],
  providers: [RaffleService],
  exports: [],
})
export class RaffleModule {}
