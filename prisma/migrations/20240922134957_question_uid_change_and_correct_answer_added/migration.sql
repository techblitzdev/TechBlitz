-- Step 1: Rename the `questionuId` to `questionUid` instead of dropping and recreating the column.
-- This will preserve the existing data.

-- Drop the foreign key constraint first
ALTER TABLE "QuestionAnswers" DROP CONSTRAINT "QuestionAnswers_questionuId_fkey";

-- Rename the column
ALTER TABLE "QuestionAnswers" RENAME COLUMN "questionuId" TO "questionUid";

-- Re-add the foreign key constraint with the updated column name
ALTER TABLE "QuestionAnswers"
ADD CONSTRAINT "QuestionAnswers_questionUid_fkey" FOREIGN KEY ("questionUid") REFERENCES "Questions"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Step 2: Add the new `correctAnswer` column with a default value or update the existing rows before enforcing NOT NULL.
-- If you want to set a default value temporarily:
ALTER TABLE "Questions" ADD COLUMN "correctAnswer" TEXT DEFAULT '' NOT NULL;

-- Step 3: If necessary, you can later remove the default if you want to enforce that future entries must provide a value.
-- ALTER TABLE "Questions" ALTER COLUMN "correctAnswer" DROP DEFAULT;
