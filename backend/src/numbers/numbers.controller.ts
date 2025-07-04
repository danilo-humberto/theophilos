import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { NumbersService } from "./numbers.service";
import { UpdateNumbersDTO } from "./dto/update-number.dto";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("numbers")
export class NumbersController {
  constructor(private readonly numbersService: NumbersService) {}

  @Get()
  findBySale(@Query("saleId") saleId: string) {
    return this.numbersService.findAllBySale(saleId);
  }

  @Patch(":saleId/update")
  update(
    @Param("saleId") saleId: string,
    @Body() updateNumbersDto: UpdateNumbersDTO,
    @Req() req
  ) {
    return this.numbersService.updateByNumer(
      saleId,
      updateNumbersDto,
      req.user.sub
    );
  }
}
