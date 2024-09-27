-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "correctDailyStreak" INTEGER DEFAULT 0,
ADD COLUMN     "totalDailyStreak" INTEGER DEFAULT 0;
