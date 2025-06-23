import { Module } from "@nestjs/common";
import { NumbersController } from "./numbers.controller";
import { NumbersService } from "./numbers.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [NumbersController],
  providers: [NumbersService],
  exports: [],
})
export class NumbersModule {}
