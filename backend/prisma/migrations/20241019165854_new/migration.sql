/*
  Warnings:

  - Added the required column `aboutCompany` to the `Recruiter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recruiter" ADD COLUMN     "aboutCompany" TEXT NOT NULL;
