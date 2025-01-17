-- CreateEnum
CREATE TYPE "AnswerDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "difficulty" "AnswerDifficulty" NOT NULL DEFAULT 'EASY';
