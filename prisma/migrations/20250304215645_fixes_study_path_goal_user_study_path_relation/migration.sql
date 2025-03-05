-- DropForeignKey
ALTER TABLE "StudyPathGoal" DROP CONSTRAINT "StudyPathGoal_userUid_studyPathUid_fkey";

-- AddForeignKey
ALTER TABLE "StudyPathGoal" ADD CONSTRAINT "StudyPathGoal_userStudyPathUid_fkey" FOREIGN KEY ("userStudyPathUid") REFERENCES "UserStudyPath"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
