/*
  Warnings:

  - You are about to drop the column `questionId` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Answers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_userId_fkey";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "questionId",
DROP COLUMN "userId",
ADD COLUMN     "questionDate" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionUid_fkey" FOREIGN KEY ("questionUid") REFERENCES "Questions"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
