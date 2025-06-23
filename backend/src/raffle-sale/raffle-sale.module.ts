import { Module } from "@nestjs/common";
import { RaffleSaleController } from "./raffle-sale.controller";
import { RaffleSaleService } from "./raffle-sale.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [RaffleSaleController],
  providers: [RaffleSaleService],
  exports: [],
})
export class RaffleSaleModule {}
