-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_userAnswerUid_fkey";

-- RenameForeignKey
ALTER TABLE "Answers" RENAME CONSTRAINT "Answers_uid_fkey" TO "questionUid";

-- RenameForeignKey
ALTER TABLE "Answers" RENAME CONSTRAINT "userAnswers" TO "Answers_uid_fkey";
