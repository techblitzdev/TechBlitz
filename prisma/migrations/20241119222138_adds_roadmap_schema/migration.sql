-- CreateEnum
CREATE TYPE "RoadmapStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "UserRoadmaps" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUid" TEXT NOT NULL,
    "status" "RoadmapStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "UserRoadmaps_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "RoadmapUserQuestions" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL,
    "codeSnippet" TEXT,
    "hint" TEXT,
    "difficulty" "QuestionDifficulty" NOT NULL DEFAULT 'EASY',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "roadmapUid" TEXT NOT NULL,
    "correctAnswerUid" TEXT NOT NULL,

    CONSTRAINT "RoadmapUserQuestions_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "RoadmapUserQuestionsAnswers" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionUid" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "answer" TEXT NOT NULL,

    CONSTRAINT "RoadmapUserQuestionsAnswers_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "RoadmapUserQuestionsUserAnswers" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionUid" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "answer" TEXT NOT NULL,

    CONSTRAINT "RoadmapUserQuestionsUserAnswers_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "DefaultRoadmapQuestions" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL,
    "codeSnippet" TEXT,
    "hint" TEXT,
    "difficulty" "QuestionDifficulty" NOT NULL DEFAULT 'EASY',

    CONSTRAINT "DefaultRoadmapQuestions_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "DefaultRoadmapQuestionsAnswers" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionUid" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "DefaultRoadmapQuestionsAnswers_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRoadmaps_userUid_key" ON "UserRoadmaps"("userUid");

-- AddForeignKey
ALTER TABLE "UserRoadmaps" ADD CONSTRAINT "UserRoadmaps_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapUserQuestions" ADD CONSTRAINT "RoadmapUserQuestions_roadmapUid_fkey" FOREIGN KEY ("roadmapUid") REFERENCES "UserRoadmaps"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapUserQuestionsAnswers" ADD CONSTRAINT "RoadmapUserQuestionsAnswers_questionUid_fkey" FOREIGN KEY ("questionUid") REFERENCES "RoadmapUserQuestions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapUserQuestionsUserAnswers" ADD CONSTRAINT "RoadmapUserQuestionsUserAnswers_questionUid_fkey" FOREIGN KEY ("questionUid") REFERENCES "RoadmapUserQuestions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultRoadmapQuestionsAnswers" ADD CONSTRAINT "DefaultRoadmapQuestionsAnswers_questionUid_fkey" FOREIGN KEY ("questionUid") REFERENCES "DefaultRoadmapQuestions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
