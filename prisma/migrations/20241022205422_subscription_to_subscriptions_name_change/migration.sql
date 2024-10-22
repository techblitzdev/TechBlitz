/*
  Warnings:

  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userUid_fkey";

-- DropTable
DROP TABLE "Subscription";

-- CreateTable
CREATE TABLE "Subscriptions" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUid" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "planId" TEXT NOT NULL,
    "planTrial" BOOLEAN NOT NULL DEFAULT false,
    "planTrialDays" INTEGER,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_userUid_key" ON "Subscriptions"("userUid");

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
