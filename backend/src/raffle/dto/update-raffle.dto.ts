import { PartialType } from "@nestjs/mapped-types";
import { CreateRaffleDTO } from "./create-raffle.dto";

export class UpdateRaffleDTO extends PartialType(CreateRaffleDTO) {}
