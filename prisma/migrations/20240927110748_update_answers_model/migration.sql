/*
  Warnings:

  - Added the required column `questionId` to the `Answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_uid_fkey";

-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "questionUid";

-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "questionId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
