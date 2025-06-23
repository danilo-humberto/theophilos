import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRaffleSaleDTO } from "./dto/create-raffle-sale.dto";
@Injectable()
export class RaffleSaleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRaffleSaleDTO, sellerId: string) {
    const { raffleId } = dto;

    const raffle = await this.prisma.raffle.findUnique({
      where: { id: raffleId },
      select: { id: true, quantity: true, status: true, endDate: true },
    });

    if (!raffle) throw new NotFoundException("Rifa nao encontrada!");
    if (raffle.status !== "ACTIVE")
      throw new BadRequestException("Rifa não está ativa!");
    if (raffle.quantity <= 0)
      throw new BadRequestException("Quantidade inválida!");

    const lastNumber = await this.prisma.number.aggregate({
      where: { sale: { raffleId } },
      _max: { number: true },
    });

    const startNumber = (lastNumber._max.number ?? 0) + 1;
    const endNumber = startNumber + raffle.quantity - 1;

    const sale = await this.prisma.raffleSale.create({
      data: {
        raffleId,
        sellerId,
        startNumber,
        endNumber,
        numbers: {
          create: Array.from({ length: raffle.quantity }, (_, index) => ({
            number: startNumber + index,
          })),
        },
      },
      include: {
        numbers: true,
        seller: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return sale;
  }

  async findById(id: string) {
    const sale = await this.prisma.raffleSale.findUnique({
      where: { id },
      include: {
        raffle: true,
        numbers: true,
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!sale) throw new NotFoundException("Rifa nao encontrada!");

    return sale;
  }

  async findAllBySeller(sellerId: string) {
    return this.prisma.raffleSale.findMany({
      where: { sellerId },
      include: {
        raffle: true,
        numbers: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async approveSale(saleId: string) {
    const sale = await this.prisma.raffleSale.findUnique({
      where: { id: saleId },
    });

    if (!sale) throw new NotFoundException("Venda nao encontrada!");

    if (sale.status !== "PENDING")
      throw new BadRequestException("Venda já foi aprovada!");

    return this.prisma.raffleSale.update({
      where: { id: saleId },
      data: { status: "APPROVED" },
    });
  }
}
