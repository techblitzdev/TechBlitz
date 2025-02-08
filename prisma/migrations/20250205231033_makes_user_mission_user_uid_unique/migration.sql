/*
  Warnings:

  - A unique constraint covering the columns `[userUid]` on the table `UserMission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserMission_userUid_key" ON "UserMission"("userUid");
