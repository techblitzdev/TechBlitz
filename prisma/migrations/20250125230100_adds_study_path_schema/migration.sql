-- CreateTable
CREATE TABLE "StudyPath" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "heroChip" TEXT NOT NULL,
    "questionSlugs" TEXT[],
    "educationLevel" TEXT NOT NULL,
    "averageCompletionTime" INTEGER,

    CONSTRAINT "StudyPath_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "UserStudyPath" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUid" TEXT NOT NULL,
    "studyPathUid" TEXT NOT NULL,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "UserStudyPath_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "StudyPathGoal" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dateSet" TIMESTAMP(3) NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "userUid" TEXT NOT NULL,
    "studyPathUid" TEXT NOT NULL,

    CONSTRAINT "StudyPathGoal_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudyPath_slug_key" ON "StudyPath"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserStudyPath_userUid_studyPathUid_key" ON "UserStudyPath"("userUid", "studyPathUid");

-- CreateIndex
CREATE UNIQUE INDEX "StudyPathGoal_userUid_studyPathUid_key" ON "StudyPathGoal"("userUid", "studyPathUid");

-- AddForeignKey
ALTER TABLE "UserStudyPath" ADD CONSTRAINT "UserStudyPath_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStudyPath" ADD CONSTRAINT "UserStudyPath_studyPathUid_fkey" FOREIGN KEY ("studyPathUid") REFERENCES "StudyPath"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPathGoal" ADD CONSTRAINT "StudyPathGoal_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPathGoal" ADD CONSTRAINT "StudyPathGoal_studyPathUid_fkey" FOREIGN KEY ("studyPathUid") REFERENCES "StudyPath"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
