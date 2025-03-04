-- AddForeignKey
ALTER TABLE "StudyPathGoal" ADD CONSTRAINT "StudyPathGoal_userUid_studyPathUid_fkey" FOREIGN KEY ("userUid", "studyPathUid") REFERENCES "UserStudyPath"("userUid", "studyPathUid") ON DELETE CASCADE ON UPDATE CASCADE;
