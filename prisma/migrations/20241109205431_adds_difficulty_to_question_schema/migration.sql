-- CreateEnum
CREATE TYPE "QuestionDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "QuestionDifficulty" "QuestionDifficulty" NOT NULL DEFAULT 'EASY';
