-- CreateTable
CREATE TABLE "Subscription" (
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

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userUid_key" ON "Subscription"("userUid");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
