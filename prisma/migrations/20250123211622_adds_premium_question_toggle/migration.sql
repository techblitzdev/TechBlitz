-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "isPremiumQuestion" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "aiQuestionHelpTokens" SET DEFAULT 10;
