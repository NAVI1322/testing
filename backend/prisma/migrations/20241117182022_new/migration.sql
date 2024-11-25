/*
  Warnings:

  - Added the required column `address` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answers` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_recruiterId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "answers" JSONB NOT NULL,
ADD COLUMN     "availability" TEXT,
ADD COLUMN     "coverLetter" TEXT,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "resume" TEXT,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "updatedBy" TEXT,
ADD COLUMN     "whyJoin" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "Application_employeeId_idx" ON "Application"("employeeId");

-- CreateIndex
CREATE INDEX "Application_recruiterId_idx" ON "Application"("recruiterId");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_employeeId_status_idx" ON "Application"("employeeId", "status");

-- CreateIndex
CREATE INDEX "Application_recruiterId_status_idx" ON "Application"("recruiterId", "status");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
