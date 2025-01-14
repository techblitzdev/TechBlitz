-- CreateEnum
CREATE TYPE "QuestionAnswerType" AS ENUM ('PREFILL', 'STANDARD');

-- AlterTable
ALTER TABLE "QuestionAnswers" ADD COLUMN     "answerFullSnippet" TEXT,
ADD COLUMN     "answerType" "QuestionAnswerType" NOT NULL DEFAULT 'STANDARD';
