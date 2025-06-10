import { Injectable } from "@nestjs/common";
import { CreateRaffleDTO } from "./dto/create-raffle.dto";
import { UpdateRaffleDTO } from "./dto/update-raffle.dto";

@Injectable()
export class RaffleService {
  create(createRaffleDto: CreateRaffleDTO) {
    return "This action adds a new raffle";
  }

  findAll() {
    return `This action returns all raffles`;
  }

  findOne(id: number) {
    return `This action returns a #id raffle`;
  }

  update(id: number, updateRaffleDto: UpdateRaffleDTO) {
    return `This action updates a #id raffle`;
  }

  remove(id: number) {
    return `This action removes a #id raffle`;
  }
}
