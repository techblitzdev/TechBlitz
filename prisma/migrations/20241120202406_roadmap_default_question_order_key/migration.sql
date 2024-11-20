/*
  Warnings:

  - Added the required column `order` to the `DefaultRoadmapQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DefaultRoadmapQuestions" ADD COLUMN     "order" INTEGER NOT NULL;
