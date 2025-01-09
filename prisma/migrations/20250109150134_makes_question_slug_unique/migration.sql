/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Questions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Questions_slug_key" ON "Questions"("slug");
