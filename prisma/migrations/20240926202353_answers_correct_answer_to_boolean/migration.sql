/*
  Warnings:

  - The `correctAnswer` column on the `Answers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "correctAnswer",
ADD COLUMN     "correctAnswer" BOOLEAN NOT NULL DEFAULT false;
