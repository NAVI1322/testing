/*
  Warnings:

  - You are about to drop the column `jobId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `_JobDescriptionAvailableJobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecruiterApplications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecruiterJobs` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `recruiterId` on table `AvailableJob` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `wageRate` to the `JobDescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableJobId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_jobId_fkey";

-- DropForeignKey
ALTER TABLE "_JobDescriptionAvailableJobs" DROP CONSTRAINT "_JobDescriptionAvailableJobs_A_fkey";

-- DropForeignKey
ALTER TABLE "_JobDescriptionAvailableJobs" DROP CONSTRAINT "_JobDescriptionAvailableJobs_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecruiterApplications" DROP CONSTRAINT "_RecruiterApplications_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecruiterApplications" DROP CONSTRAINT "_RecruiterApplications_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecruiterJobs" DROP CONSTRAINT "_RecruiterJobs_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecruiterJobs" DROP CONSTRAINT "_RecruiterJobs_B_fkey";

-- AlterTable
ALTER TABLE "AvailableJob" ALTER COLUMN "recruiterId" SET NOT NULL;

-- AlterTable
ALTER TABLE "JobDescription" ADD COLUMN     "wageRate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "jobId",
ADD COLUMN     "availableJobId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_JobDescriptionAvailableJobs";

-- DropTable
DROP TABLE "_RecruiterApplications";

-- DropTable
DROP TABLE "_RecruiterJobs";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_availableJobId_fkey" FOREIGN KEY ("availableJobId") REFERENCES "AvailableJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
