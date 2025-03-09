-- CreateEnum
CREATE TYPE "LeagueName" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND');

-- CreateEnum
CREATE TYPE "LeagueColor" AS ENUM ('CD7F32', 'C0C0C0', 'FFD700', 'E5E4E2', 'b9f2ff', 'FF4D4D');

-- CreateEnum
CREATE TYPE "LeagueAchievementType" AS ENUM ('LEAGUE_WINNER', 'TOP_THREE', 'PROMOTION', 'PERFECT_WEEK', 'SURVIVAL', 'COMEBACK_KING', 'CONSISTENCY', 'SPEED_DEMON');

-- CreateEnum
CREATE TYPE "LeaguePowerUp" AS ENUM ('DOUBLE_XP', 'SHIELD', 'STREAK_SAVER', 'TIME_FREEZE', 'BONUS_POINTS');

-- CreateTable
CREATE TABLE "IndividualLeagueData" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" "LeagueName" NOT NULL,
    "color" "LeagueColor" NOT NULL,
    "description" TEXT,
    "xpRequirement" INTEGER NOT NULL,
    "resetDate" TIMESTAMP(3) NOT NULL,
    "canBeRelegated" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT,
    "inactivityThresholdDays" INTEGER DEFAULT 7,
    "maxPowerUpsPerWeek" INTEGER NOT NULL DEFAULT 3,
    "xpMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,

    CONSTRAINT "IndividualLeagueData_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Leagues" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "leagueDataUid" TEXT NOT NULL,
    "maxUsers" INTEGER NOT NULL DEFAULT 30,
    "currentUsers" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "promotionCount" INTEGER NOT NULL DEFAULT 3,
    "relegationCount" INTEGER NOT NULL DEFAULT 5,
    "weeklyChallenge" TEXT,
    "weeklyChallengeXP" INTEGER,

    CONSTRAINT "Leagues_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "UserLeague" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUid" TEXT NOT NULL,
    "leagueUid" TEXT NOT NULL,
    "position" INTEGER,
    "weeklyXp" INTEGER NOT NULL DEFAULT 0,
    "promoted" BOOLEAN NOT NULL DEFAULT false,
    "relegated" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "bestPosition" INTEGER,
    "activePowerUps" "LeaguePowerUp"[],
    "powerUpExpiryTime" TIMESTAMP(3),
    "challengeProgress" INTEGER NOT NULL DEFAULT 0,
    "challengeCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserLeague_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "LeagueAchievement" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUid" TEXT NOT NULL,
    "leagueDataUid" TEXT NOT NULL,
    "type" "LeagueAchievementType" NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "xpBonus" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LeagueAchievement_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "LeagueHistory" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUid" TEXT NOT NULL,
    "leagueDataUid" TEXT NOT NULL,
    "finalPosition" INTEGER NOT NULL,
    "finalXp" INTEGER NOT NULL,
    "wasPromoted" BOOLEAN NOT NULL,
    "wasRelegated" BOOLEAN NOT NULL,
    "weekStartDate" TIMESTAMP(3) NOT NULL,
    "weekEndDate" TIMESTAMP(3) NOT NULL,
    "averageXpPerDay" DOUBLE PRECISION,
    "powerUpsUsed" INTEGER NOT NULL DEFAULT 0,
    "challengesCompleted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LeagueHistory_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLeague_userUid_leagueUid_key" ON "UserLeague"("userUid", "leagueUid");

-- AddForeignKey
ALTER TABLE "Leagues" ADD CONSTRAINT "Leagues_leagueDataUid_fkey" FOREIGN KEY ("leagueDataUid") REFERENCES "IndividualLeagueData"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLeague" ADD CONSTRAINT "UserLeague_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLeague" ADD CONSTRAINT "UserLeague_leagueUid_fkey" FOREIGN KEY ("leagueUid") REFERENCES "Leagues"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueAchievement" ADD CONSTRAINT "LeagueAchievement_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueAchievement" ADD CONSTRAINT "LeagueAchievement_leagueDataUid_fkey" FOREIGN KEY ("leagueDataUid") REFERENCES "IndividualLeagueData"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueHistory" ADD CONSTRAINT "LeagueHistory_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueHistory" ADD CONSTRAINT "LeagueHistory_leagueDataUid_fkey" FOREIGN KEY ("leagueDataUid") REFERENCES "IndividualLeagueData"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
