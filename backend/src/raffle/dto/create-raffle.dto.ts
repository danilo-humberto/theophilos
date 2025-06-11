import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRaffleDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  endDate: string;
}
