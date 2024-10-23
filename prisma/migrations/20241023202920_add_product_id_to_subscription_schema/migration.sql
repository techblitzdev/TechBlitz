/*
  Warnings:

  - Added the required column `productId` to the `Subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscriptions" ADD COLUMN     "productId" TEXT NOT NULL;
