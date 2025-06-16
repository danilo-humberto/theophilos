import { Injectable } from "@nestjs/common";
import { TokenType } from "@prisma/client";
import { addMinutes } from "date-fns";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class VerificationTokenService {
  constructor(private readonly prisma: PrismaService) {}

  async generateToken(params: {
    identifier: string;
    type: TokenType;
    userId?: string;
    expiresInMinutes?: number;
  }) {
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = addMinutes(new Date(), params.expiresInMinutes ?? 10);

    const verificationToken = await this.prisma.verificationToken.create({
      data: {
        identifier: params.identifier,
        token,
        type: params.type,
        expiresAt,
        userId: params.userId,
      },
    });

    return verificationToken;
  }

  async findToken(identifier: string, token: string, type: TokenType) {
    return this.prisma.verificationToken.findFirst({
      where: {
        identifier,
        token,
        type,
      },
    });
  }

  async deleteToken(id: string) {
    return this.prisma.verificationToken.delete({
      where: { id },
    });
  }

  async deleteAllTokensByIdentifier(identifier: string, type: TokenType) {
    return this.prisma.verificationToken.deleteMany({
      where: { identifier, type },
    });
  }
}
