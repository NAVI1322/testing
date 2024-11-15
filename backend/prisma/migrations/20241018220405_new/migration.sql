/*
  Warnings:

  - You are about to drop the column `jobName` on the `AvailableJob` table. All the data in the column will be lost.
  - Added the required column `jobDescriptionId` to the `AvailableJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableJob" DROP COLUMN "jobName",
ADD COLUMN     "jobDescriptionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "JobDescription" (
    "id" TEXT NOT NULL,
    "jobName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "ourValues" TEXT NOT NULL,
    "positionSummary" TEXT NOT NULL,
    "positionResponsibilities" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "whyWorkWithUs" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "JobDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobDescriptionAvailableJobs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobDescriptionAvailableJobs_AB_unique" ON "_JobDescriptionAvailableJobs"("A", "B");

-- CreateIndex
CREATE INDEX "_JobDescriptionAvailableJobs_B_index" ON "_JobDescriptionAvailableJobs"("B");

-- AddForeignKey
ALTER TABLE "AvailableJob" ADD CONSTRAINT "AvailableJob_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobDescriptionAvailableJobs" ADD CONSTRAINT "_JobDescriptionAvailableJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "AvailableJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobDescriptionAvailableJobs" ADD CONSTRAINT "_JobDescriptionAvailableJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "JobDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
