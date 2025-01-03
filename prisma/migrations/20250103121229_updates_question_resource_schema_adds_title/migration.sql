/*
  Warnings:

  - Added the required column `title` to the `QuestionResources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `QuestionResources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionResources" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
