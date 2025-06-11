import { Module } from "@nestjs/common";
import { RaffleSaleController } from "./raffle-sale.controller";
import { RaffleSaleService } from "./raffle-sale.service";

@Module({
  imports: [],
  controllers: [RaffleSaleController],
  providers: [RaffleSaleService],
  exports: [],
})
export class RaffleSaleModule {}
