/*
  Warnings:

  - A unique constraint covering the columns `[number,saleId]` on the table `Number` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RaffleSale_raffleId_key";

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "RaffleSale" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Number_number_saleId_key" ON "Number"("number", "saleId");

-- CreateIndex
CREATE INDEX "Raffle_createdById_idx" ON "Raffle"("createdById");

-- CreateIndex
CREATE INDEX "RaffleSale_raffleId_idx" ON "RaffleSale"("raffleId");

-- CreateIndex
CREATE INDEX "RaffleSale_sellerId_idx" ON "RaffleSale"("sellerId");
