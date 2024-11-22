/*
  Warnings:

  - Added the required column `order` to the `RoadmapUserQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoadmapUserQuestions" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RoadmapUserQuestionsAnswers" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
