-- CreateEnum
CREATE TYPE "RoadmapGenerationStatus" AS ENUM ('FETCHING_DATA', 'FIRST_PASS', 'SECOND_PASS', 'GENERATING_QUESTIONS');

-- CreateTable
CREATE TABLE "RoadmapGenerationProgress" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roadmapUid" TEXT NOT NULL,
    "status" "RoadmapGenerationStatus" NOT NULL DEFAULT 'FETCHING_DATA',

    CONSTRAINT "RoadmapGenerationProgress_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "RoadmapGenerationProgress" ADD CONSTRAINT "RoadmapGenerationProgress_roadmapUid_fkey" FOREIGN KEY ("roadmapUid") REFERENCES "UserRoadmaps"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
