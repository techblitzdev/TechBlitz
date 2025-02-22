/*
  Warnings:

  - You are about to drop the column `roadmapUid` on the `RoadmapGenerationProgress` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoadmapGenerationProgress" DROP CONSTRAINT "RoadmapGenerationProgress_roadmapUid_fkey";

-- AlterTable
ALTER TABLE "RoadmapGenerationProgress" DROP COLUMN "roadmapUid";
