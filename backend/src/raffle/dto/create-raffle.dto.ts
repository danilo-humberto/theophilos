import { Type } from "class-transformer";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateRaffleDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  pixKey: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
