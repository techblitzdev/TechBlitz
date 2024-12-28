-- CreateTable
CREATE TABLE "StatisticsReport" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUid" TEXT NOT NULL,
    "correctTags" TEXT[],
    "incorrectTags" TEXT[],
    "htmlReport" TEXT,

    CONSTRAINT "StatisticsReport_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "_QuestionsToStatisticsReport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_QuestionsToStatisticsReport_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_QuestionsToStatisticsReport_B_index" ON "_QuestionsToStatisticsReport"("B");

-- AddForeignKey
ALTER TABLE "StatisticsReport" ADD CONSTRAINT "StatisticsReport_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsToStatisticsReport" ADD CONSTRAINT "_QuestionsToStatisticsReport_A_fkey" FOREIGN KEY ("A") REFERENCES "Questions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsToStatisticsReport" ADD CONSTRAINT "_QuestionsToStatisticsReport_B_fkey" FOREIGN KEY ("B") REFERENCES "StatisticsReport"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
