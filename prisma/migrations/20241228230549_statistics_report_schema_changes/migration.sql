/*
  Warnings:

  - You are about to drop the `_QuestionsToStatisticsReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuestionsToStatisticsReport" DROP CONSTRAINT "_QuestionsToStatisticsReport_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionsToStatisticsReport" DROP CONSTRAINT "_QuestionsToStatisticsReport_B_fkey";

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "customQuestion" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_QuestionsToStatisticsReport";

-- CreateTable
CREATE TABLE "_SharedQuestions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SharedQuestions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SharedQuestions_B_index" ON "_SharedQuestions"("B");

-- AddForeignKey
ALTER TABLE "_SharedQuestions" ADD CONSTRAINT "_SharedQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Questions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedQuestions" ADD CONSTRAINT "_SharedQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "StatisticsReport"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
