-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('CODE', 'MULTIPLE_CHOICE');

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "questionType" "QuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE';
