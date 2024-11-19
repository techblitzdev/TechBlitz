-- CreateTable
CREATE TABLE "DefaultRoadmapQuestionsUsersAnswers" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionUid" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "roadmapUid" TEXT NOT NULL,

    CONSTRAINT "DefaultRoadmapQuestionsUsersAnswers_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "DefaultRoadmapQuestionsUsersAnswers" ADD CONSTRAINT "DefaultRoadmapQuestionsUsersAnswers_questionUid_fkey" FOREIGN KEY ("questionUid") REFERENCES "DefaultRoadmapQuestions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultRoadmapQuestionsUsersAnswers" ADD CONSTRAINT "DefaultRoadmapQuestionsUsersAnswers_roadmapUid_fkey" FOREIGN KEY ("roadmapUid") REFERENCES "UserRoadmaps"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
