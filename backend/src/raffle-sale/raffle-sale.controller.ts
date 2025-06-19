import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { RaffleSaleService } from "./raffle-sale.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateRaffleSaleDTO } from "./dto/create-raffle-sale.dto";

@UseGuards(AuthGuard)
@Controller("raffle-sales")
export class RaffleSaleController {
  constructor(private readonly rafflesaleService: RaffleSaleService) {}

  @Post()
  create(@Body() dto: CreateRaffleSaleDTO, @Request() req) {
    const sellerId = req.user.sub;
    return this.rafflesaleService.create(dto, sellerId);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.rafflesaleService.findById(id);
  }

  @Get()
  findAllBySeller(@Request() req) {
    const sellerId = req.user.sub;
    return this.rafflesaleService.findAllBySeller(sellerId);
  }
}
