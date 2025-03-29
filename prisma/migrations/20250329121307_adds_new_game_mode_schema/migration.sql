-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "aiTimeToComplete" INTEGER;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "fasterThanAiGameMode" BOOLEAN NOT NULL DEFAULT false;
