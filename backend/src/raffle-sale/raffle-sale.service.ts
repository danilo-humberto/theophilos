import { Injectable } from "@nestjs/common";
@Injectable()
export class RaffleSaleService {
  create(createRaffleSaleDto: string) {
    return "This action adds a new raffle-sale";
  }

  findAll() {
    return `This action returns all raffle-sales`;
  }

  findOne(id: number) {
    return `This action returns a #id raffle-sale`;
  }

  update(id: number, updateRaffleSaleDto: string) {
    return `This action updates a #id raffle-sale`;
  }

  remove(id: number) {
    return `This action removes a #id raffle-sale`;
  }
}
