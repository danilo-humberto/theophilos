import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { RaffleSaleService } from "./raffle-sale.service";

@Controller("raffle-sales")
export class RaffleSaleController {
  constructor(private readonly rafflesaleService: RaffleSaleService) {}

  @Post()
  create(@Body() createRaffleSaleDto: string) {
    return this.rafflesaleService.create(createRaffleSaleDto);
  }

  @Get()
  findAll() {
    return this.rafflesaleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rafflesaleService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRaffleSaleDto: string) {
    return this.rafflesaleService.update(+id, updateRaffleSaleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rafflesaleService.remove(+id);
  }
}
