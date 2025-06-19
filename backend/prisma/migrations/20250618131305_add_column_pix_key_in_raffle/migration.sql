/*
  Warnings:

  - Added the required column `pixKey` to the `Raffle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Raffle" ADD COLUMN     "pixKey" TEXT NOT NULL;
