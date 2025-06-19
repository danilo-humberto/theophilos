import { NumberStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateNumbersDTO {
  @IsOptional()
  @IsString()
  buyerName?: string;

  @IsOptional()
  @IsString()
  buyerPhone?: string;

  @IsOptional()
  @IsString()
  proofUrl?: string;
}
