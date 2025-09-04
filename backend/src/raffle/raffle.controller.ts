import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { RaffleService } from "./raffle.service";
import { CreateRaffleDTO } from "./dto/create-raffle.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "@prisma/client";
import { UpdateRaffleDTO } from "./dto/update-raffle.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("raffles")
export class RaffleController {
  constructor(private readonly raffleService: RaffleService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @Roles(Role.LEADER, Role.ADMIN)
  create(@Body() createRaffleDto: CreateRaffleDTO, @Req() req) {
    return this.raffleService.create(createRaffleDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.raffleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.raffleService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(":id")
  @Roles(Role.LEADER, Role.ADMIN)
  update(@Param("id") id: string, @Body() updateRaffleDto: UpdateRaffleDTO) {
    return this.raffleService.update(id, updateRaffleDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(":id/image")
  @Roles(Role.LEADER, Role.ADMIN)
  @UseInterceptors(FileInterceptor("image"))
  updateImage(
    @Param("id") id: string,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.raffleService.updateImage(id, image);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(":id")
  @Roles(Role.LEADER, Role.ADMIN)
  remove(@Param("id") id: string) {
    return this.raffleService.remove(id);
  }
}
