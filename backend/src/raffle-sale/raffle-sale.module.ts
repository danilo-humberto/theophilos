import { Module } from "@nestjs/common";
import { RaffleSaleController } from "./raffle-sale.controller";
import { RaffleSaleService } from "./raffle-sale.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [RaffleSaleController],
  providers: [RaffleSaleService],
  exports: [],
})
export class RaffleSaleModule {}
