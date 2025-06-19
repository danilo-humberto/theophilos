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

  async update(id: string, dto: UpdateNumbersDTO, userId?: string) {
    const existing = await this.prisma.number.findUnique({
      where: { id },
      include: { sale: { select: { sellerId: true } } },
    });
    if (!existing) throw new NotFoundException("Número nao encontrado!");

    if (userId && existing.sale.sellerId !== userId)
      throw new BadRequestException("Você não pode editar este bilhete!");

    if (existing.status === NumberStatus.PAID)
      throw new BadRequestException(
        "O bilhete ja foi pago e não pode ser alterado!"
      );

    let newStatus: NumberStatus = existing.status;

    if (dto.proofUrl) {
      const willHaveBuyer = dto.buyerName ?? existing.buyerName;
      const willHaveBuyerPhone = dto.buyerPhone ?? existing.buyerPhone;

      if (!willHaveBuyer || !willHaveBuyerPhone)
        throw new BadRequestException(
          "Para enviar o comprovante, precisa estar preenchido o nome e o telefone do comprador!"
        );

      newStatus = NumberStatus.PAID;
    } else if (
      (dto.buyerName || dto.buyerPhone) &&
      existing.status === NumberStatus.AVAILABLE
    )
      newStatus = NumberStatus.RESERVED;

    const dataToUpdate = {
      ...dto,
      status: newStatus,
    };

    return this.prisma.number.update({
      where: { id },
      data: dataToUpdate,
    });
  }
}
