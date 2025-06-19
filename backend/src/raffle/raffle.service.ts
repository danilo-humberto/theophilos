import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRaffleDTO } from "./dto/create-raffle.dto";
import { UpdateRaffleDTO } from "./dto/update-raffle.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RaffleService {
  constructor(private prisma: PrismaService) {}
  async create(createRaffleDto: CreateRaffleDTO, userId: string) {
    const end = new Date(createRaffleDto.endDate);
    if (end <= new Date())
      throw new BadRequestException("A data de encerramento deve ser futura!");

    return await this.prisma.raffle.create({
      data: {
        ...createRaffleDto,
        endDate: end,
        createdById: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        price: true,
        quantity: true,
        pixKey: true,
        endDate: true,
        status: true,
        createdAt: true,
        createdBy: { select: { id: true, name: true } },
      },
    });
  }

  async findAll() {
    return await this.prisma.raffle.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const raffle = await this.prisma.raffle.findUnique({
      where: { id },
      include: {
        sales: {
          include: {
            numbers: true,
            seller: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!raffle) throw new NotFoundException("Rifa nao encontrada!");

    return raffle;
  }

  async update(id: string, updateRaffleDto: UpdateRaffleDTO) {
    const raffle = await this.prisma.raffle.findUnique({ where: { id } });
    if (!raffle) throw new NotFoundException("Rifa nao encontrada!");

    if (updateRaffleDto.endDate) {
      const end = new Date(updateRaffleDto.endDate);
      if (end <= new Date())
        throw new BadRequestException(
          "A data de encerramento deve ser futura!"
        );
    }

    return await this.prisma.raffle.update({
      where: { id },
      data: { ...updateRaffleDto },
    });
  }

  async remove(id: string) {
    const raffle = await this.prisma.raffle.findUnique({ where: { id } });
    if (!raffle) throw new NotFoundException("Rifa nao encontrada!");
    return await this.prisma.raffle.delete({
      where: { id },
    });
  }
}
