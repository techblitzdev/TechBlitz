-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_questionUid_fkey";

-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_userUid_fkey";

-- DropForeignKey
ALTER TABLE "QuestionAnswers" DROP CONSTRAINT "QuestionAnswers_questionUid_fkey";

-- DropForeignKey
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_userUid_fkey";

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAnswers" ADD CONSTRAINT "QuestionAnswers_questionUid_fkey" FOREIGN KEY ("questionUid") REFERENCES "Questions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionUid_fkey" FOREIGN KEY ("questionUid") REFERENCES "Questions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
