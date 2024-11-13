-- CreateTable
CREATE TABLE "Streaks" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUid" TEXT NOT NULL,
    "streakStart" TIMESTAMP(3) NOT NULL,
    "streakEnd" TIMESTAMP(3) NOT NULL,
    "currentstreakCount" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Streaks_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Streaks_userUid_key" ON "Streaks"("userUid");

-- AddForeignKey
ALTER TABLE "Streaks" ADD CONSTRAINT "Streaks_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
