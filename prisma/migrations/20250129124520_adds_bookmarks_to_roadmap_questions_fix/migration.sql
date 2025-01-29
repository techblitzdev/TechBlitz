/*
  Warnings:

  - You are about to drop the `_RoadmapUserQuestionsToUserBookmarks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,questionId,roadmapUserQuestionId]` on the table `UserBookmarks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_RoadmapUserQuestionsToUserBookmarks" DROP CONSTRAINT "_RoadmapUserQuestionsToUserBookmarks_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoadmapUserQuestionsToUserBookmarks" DROP CONSTRAINT "_RoadmapUserQuestionsToUserBookmarks_B_fkey";

-- DropIndex
DROP INDEX "UserBookmarks_userId_questionId_key";

-- AlterTable
ALTER TABLE "UserBookmarks" ADD COLUMN     "roadmapUserQuestionId" TEXT,
ALTER COLUMN "questionId" DROP NOT NULL;

-- DropTable
DROP TABLE "_RoadmapUserQuestionsToUserBookmarks";

-- CreateIndex
CREATE INDEX "UserBookmarks_roadmapUserQuestionId_idx" ON "UserBookmarks"("roadmapUserQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBookmarks_userId_questionId_roadmapUserQuestionId_key" ON "UserBookmarks"("userId", "questionId", "roadmapUserQuestionId");

-- AddForeignKey
ALTER TABLE "UserBookmarks" ADD CONSTRAINT "UserBookmarks_roadmapUserQuestionId_fkey" FOREIGN KEY ("roadmapUserQuestionId") REFERENCES "RoadmapUserQuestions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
