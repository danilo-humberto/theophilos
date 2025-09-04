import { forwardRef, Module } from "@nestjs/common";
import { RaffleController } from "./raffle.controller";
import { RaffleService } from "./raffle.service";
import { UsersModule } from "src/users/users.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { UploadFileModule } from "src/uploadFile/upload-file.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PrismaModule,
    AuthModule,
    UploadFileModule,
  ],
  controllers: [RaffleController],
  providers: [RaffleService],
  exports: [],
})
export class RaffleModule {}
