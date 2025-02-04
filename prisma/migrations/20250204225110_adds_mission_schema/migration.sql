-- CreateEnum
CREATE TYPE "MissionType" AS ENUM ('STREAK_MAINTAINED', 'QUESTION_ANSWERED', 'XP_EARNED', 'QUESTION_CORRECT', 'FRIEND_INVITED', 'QUESTION_ANSWERED_FAST');

-- CreateEnum
CREATE TYPE "MissionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Mission" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "MissionType" NOT NULL,
    "requirements" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "UserMission" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUid" TEXT NOT NULL,
    "missionUid" TEXT NOT NULL,
    "progress" JSONB NOT NULL DEFAULT '{}',
    "status" "MissionStatus" NOT NULL DEFAULT 'PENDING',
    "completedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),

    CONSTRAINT "UserMission_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "UserMission" ADD CONSTRAINT "UserMission_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMission" ADD CONSTRAINT "UserMission_missionUid_fkey" FOREIGN KEY ("missionUid") REFERENCES "Mission"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
