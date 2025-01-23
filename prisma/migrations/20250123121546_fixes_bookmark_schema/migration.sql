/*
  Warnings:

  - You are about to drop the `_UserBookmarks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserBookmarks" DROP CONSTRAINT "_UserBookmarks_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBookmarks" DROP CONSTRAINT "_UserBookmarks_B_fkey";

-- DropTable
DROP TABLE "_UserBookmarks";

-- CreateTable
CREATE TABLE "UserBookmarks" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "UserBookmarks_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE INDEX "UserBookmarks_userId_idx" ON "UserBookmarks"("userId");

-- CreateIndex
CREATE INDEX "UserBookmarks_questionId_idx" ON "UserBookmarks"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBookmarks_userId_questionId_key" ON "UserBookmarks"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "UserBookmarks" ADD CONSTRAINT "UserBookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookmarks" ADD CONSTRAINT "UserBookmarks_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
