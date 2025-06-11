/*
  Warnings:

  - A unique constraint covering the columns `[raffleId]` on the table `RaffleSale` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "RaffleSale" ADD COLUMN     "status" "SaleStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "RaffleSale_raffleId_key" ON "RaffleSale"("raffleId");
