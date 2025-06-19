import { Module } from "@nestjs/common";
import { NumbersController } from "./numbers.controller";
import { NumbersService } from "./numbers.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [NumbersController],
  providers: [NumbersService],
  exports: [],
})
export class NumbersModule {}
