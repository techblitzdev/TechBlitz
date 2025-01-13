/*
  Warnings:

  - Added the required column `handle` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "handle" TEXT NOT NULL;
