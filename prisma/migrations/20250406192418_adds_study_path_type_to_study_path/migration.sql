-- CreateEnum
CREATE TYPE "StudyPathType" AS ENUM ('LEARN', 'PRACTICE', 'BUILD', 'REVIEW');

-- AlterTable
ALTER TABLE "StudyPath" ADD COLUMN     "type" "StudyPathType" NOT NULL DEFAULT 'LEARN';
