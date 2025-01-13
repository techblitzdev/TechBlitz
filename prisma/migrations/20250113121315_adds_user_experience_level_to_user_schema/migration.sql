-- CreateEnum
CREATE TYPE "UserExperienceLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'MASTER');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "experienceLevel" "UserExperienceLevel" NOT NULL DEFAULT 'BEGINNER';
