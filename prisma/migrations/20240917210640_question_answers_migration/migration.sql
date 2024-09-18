/*
  Warnings:

  - You are about to drop the column `answer` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "answer";

-- CreateTable
CREATE TABLE "QuestionAnswers" (
    "uid" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "QuestionAnswers_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "QuestionAnswers" ADD CONSTRAINT "QuestionAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
