/*
  Warnings:

  - Made the column `leftHeader` on table `PseoPages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `leftSubheader` on table `PseoPages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roadmapTitle` on table `PseoPages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roadmapDescription` on table `PseoPages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questionHeader` on table `PseoPages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questionSubheader` on table `PseoPages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contentGridTitle` on table `PseoPages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ctaTitle` on table `PseoPages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ctaDescription` on table `PseoPages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PseoPages" ALTER COLUMN "leftHeader" SET NOT NULL,
ALTER COLUMN "leftSubheader" SET NOT NULL,
ALTER COLUMN "roadmapTitle" SET NOT NULL,
ALTER COLUMN "roadmapDescription" SET NOT NULL,
ALTER COLUMN "questionHeader" SET NOT NULL,
ALTER COLUMN "questionSubheader" SET NOT NULL,
ALTER COLUMN "contentGridTitle" SET NOT NULL,
ALTER COLUMN "ctaTitle" SET NOT NULL,
ALTER COLUMN "ctaDescription" SET NOT NULL;
