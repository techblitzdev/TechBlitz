/*
  Warnings:

  - The values [CODE] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('CODING_CHALLENGE', 'MULTIPLE_CHOICE');
ALTER TABLE "Questions" ALTER COLUMN "questionType" DROP DEFAULT;
ALTER TABLE "Questions" ALTER COLUMN "questionType" TYPE "QuestionType_new" USING ("questionType"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
ALTER TABLE "Questions" ALTER COLUMN "questionType" SET DEFAULT 'MULTIPLE_CHOICE';
COMMIT;

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "expectedParams" JSONB,
ADD COLUMN     "functionName" TEXT,
ADD COLUMN     "returnType" TEXT,
ADD COLUMN     "testCases" JSONB;
