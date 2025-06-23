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
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "@prisma/client";

@UseGuards(AuthGuard, RolesGuard)
@Controller("raffle-sales")
export class RaffleSaleController {
  constructor(private readonly rafflesaleService: RaffleSaleService) {}

  @Post()
  create(@Body() dto: CreateRaffleSaleDTO, @Request() req) {
    const sellerId = req.user.sub;
    return this.rafflesaleService.create(dto, sellerId);
  }

  @Post(":id/approve")
  @Roles(Role.ADMIN, Role.LEADER)
  approveSale(@Param("id") id: string) {
    return this.rafflesaleService.approveSale(id);
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
