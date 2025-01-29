-- CreateTable
CREATE TABLE "_RoadmapUserQuestionsToUserBookmarks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoadmapUserQuestionsToUserBookmarks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RoadmapUserQuestionsToUserBookmarks_B_index" ON "_RoadmapUserQuestionsToUserBookmarks"("B");

-- AddForeignKey
ALTER TABLE "_RoadmapUserQuestionsToUserBookmarks" ADD CONSTRAINT "_RoadmapUserQuestionsToUserBookmarks_A_fkey" FOREIGN KEY ("A") REFERENCES "RoadmapUserQuestions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoadmapUserQuestionsToUserBookmarks" ADD CONSTRAINT "_RoadmapUserQuestionsToUserBookmarks_B_fkey" FOREIGN KEY ("B") REFERENCES "UserBookmarks"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
