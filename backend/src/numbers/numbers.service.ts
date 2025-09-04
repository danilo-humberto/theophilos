import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateNumbersDTO } from "./dto/update-number.dto";
import { NumberStatus } from "@prisma/client";

@Injectable()
export class NumbersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllBySale(saleId: string) {
    const sale = await this.prisma.raffleSale.findUnique({
      where: { id: saleId },
    });

    if (!sale) throw new NotFoundException("Venda nao encontrada!");

    return this.prisma.number.findMany({
      where: { saleId },
      orderBy: { number: "asc" },
    });
  }

  async updateByNumer(saleId: string, dto: UpdateNumbersDTO, userId?: string) {
    const numbers = await this.prisma.number.findMany({
      where: {
        saleId,
        number: { in: dto.numbers },
        sale: { sellerId: userId },
      },
      include: {
        sale: { select: { sellerId: true } },
      },
    });

    if (numbers.length !== dto.numbers.length) {
      throw new BadRequestException("Números inválidos!");
    }

    for (const number of numbers) {
      if (number.sale.sellerId !== userId) {
        throw new BadRequestException("Números inválidos!");
      }
    }

    for (const num of numbers) {
      if (num.status === NumberStatus.PAID)
        throw new BadRequestException(
          `O número ${num.number} ja foi pago e não pode ser alterado!`
        );
    }

    let newStatus = numbers[0].status;

    if (dto.proofUrl) {
      if (!dto.buyerName || !dto.buyerPhone) {
        throw new BadRequestException(
          "Para enviar o comprovante, é necessário nome e telefone do comprador."
        );
      }
      newStatus = NumberStatus.PAID;
    } else if (dto.buyerName || dto.buyerPhone) {
      newStatus = NumberStatus.RESERVED;
    }

    const update = await this.prisma.number.updateMany({
      where: {
        number: { in: dto.numbers },
        sale: { sellerId: userId },
      },
      data: {
        status: newStatus,
        buyerName: dto.buyerName,
        buyerPhone: dto.buyerPhone,
        proofUrl: dto.proofUrl,
      },
    });

    return {
      message: `${update.count} numeros alterados com sucesso!`,
    };
  }

  private extByMime(mime: string) {
    switch (mime) {
      case "image/jpeg":
        return ".jpg";
      case "image/png":
        return ".png";
      case "image/webp":
        return ".webp";
      case "application/pdf":
        return ".pdf";
      default:
        return "";
    }
  }
}
