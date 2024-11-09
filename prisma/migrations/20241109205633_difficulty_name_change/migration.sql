/*
  Warnings:

  - You are about to drop the column `QuestionDifficulty` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "QuestionDifficulty",
ADD COLUMN     "difficulty" "QuestionDifficulty" NOT NULL DEFAULT 'EASY';
