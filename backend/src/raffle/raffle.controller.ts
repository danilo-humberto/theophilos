import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { RaffleService } from "./raffle.service";
import { CreateRaffleDTO } from "./dto/create-raffle.dto";

@Controller("raffles")
export class RaffleController {
  constructor(private readonly raffleService: RaffleService) {}

  @Post()
  create(@Body() createRaffleDto: CreateRaffleDTO) {
    return this.raffleService.create(createRaffleDto);
  }

  @Get()
  findAll() {
    return this.raffleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.raffleService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRaffleDto: string) {
    return this.raffleService.update(+id, updateRaffleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.raffleService.remove(+id);
  }
}
