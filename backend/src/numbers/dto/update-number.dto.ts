import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateNumbersDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  numbers: number[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  buyerName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  buyerPhone?: string;

  @IsOptional()
  @IsString()
  proofUrl?: string;
}
