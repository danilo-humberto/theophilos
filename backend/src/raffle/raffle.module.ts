import { Module } from "@nestjs/common";
import { RaffleController } from "./raffle.controller";
import { RaffleService } from "./raffle.service";

@Module({
  imports: [],
  controllers: [RaffleController],
  providers: [RaffleService],
  exports: [],
})
export class RaffleModule {}
