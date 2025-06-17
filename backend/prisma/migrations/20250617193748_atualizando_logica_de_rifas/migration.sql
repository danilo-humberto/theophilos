/*
  Warnings:

  - Made the column `buyerName` on table `Number` required. This step will fail if there are existing NULL values in that column.
  - Made the column `buyerPhone` on table `Number` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `endNumber` to the `RaffleSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startNumber` to the `RaffleSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Number" ALTER COLUMN "buyerName" SET NOT NULL,
ALTER COLUMN "buyerPhone" SET NOT NULL;

-- AlterTable
ALTER TABLE "RaffleSale" ADD COLUMN     "endNumber" INTEGER NOT NULL,
ADD COLUMN     "startNumber" INTEGER NOT NULL;
