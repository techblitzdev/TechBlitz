-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('STREAK', 'QUESTION_ANSWERED', 'QUESTION_CORRECT', 'TIME_TAKEN', 'LEADERBOARD_POSITION');

-- CreateEnum
CREATE TYPE "CompletionStatus" AS ENUM ('INCOMPLETE', 'COMPLETED');

-- CreateTable
CREATE TABLE "Badge" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "type" "BadgeType" NOT NULL,
    "requirements" JSONB NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "badgeUid" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL,
    "status" "CompletionStatus" NOT NULL DEFAULT 'INCOMPLETE',
    "progress" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_badgeUid_fkey" FOREIGN KEY ("badgeUid") REFERENCES "Badge"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
