/*
  Warnings:

  - You are about to drop the column `questionId` on the `QuestionAnswers` table. All the data in the column will be lost.
  - Added the required column `questionuId` to the `QuestionAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuestionAnswers" DROP CONSTRAINT "QuestionAnswers_questionId_fkey";

-- AlterTable
ALTER TABLE "QuestionAnswers" DROP COLUMN "questionId",
ADD COLUMN     "questionuId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionAnswers" ADD CONSTRAINT "QuestionAnswers_questionuId_fkey" FOREIGN KEY ("questionuId") REFERENCES "Questions"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
