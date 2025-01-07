-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "stripeEmails" TEXT[] DEFAULT ARRAY[]::TEXT[];
