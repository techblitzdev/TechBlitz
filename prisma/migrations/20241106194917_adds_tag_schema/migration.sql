/*
  Warnings:

  - You are about to drop the column `tags` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "Tag" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "QuestionTags" (
    "questionId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "QuestionTags_pkey" PRIMARY KEY ("questionId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "QuestionTags_tagId_idx" ON "QuestionTags"("tagId");

-- CreateIndex
CREATE INDEX "QuestionTags_questionId_idx" ON "QuestionTags"("questionId");

-- AddForeignKey
ALTER TABLE "QuestionTags" ADD CONSTRAINT "QuestionTags_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTags" ADD CONSTRAINT "QuestionTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
