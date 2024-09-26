/*
  Warnings:

  - You are about to drop the column `questionDate` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `userAnswer` on the `Answers` table. All the data in the column will be lost.
  - Added the required column `userAnswerUid` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "questionDate",
DROP COLUMN "updatedAt",
DROP COLUMN "userAnswer",
ADD COLUMN     "userAnswerUid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuestionAnswers" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userAnswerUid_fkey" FOREIGN KEY ("userAnswerUid") REFERENCES "QuestionAnswers"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
