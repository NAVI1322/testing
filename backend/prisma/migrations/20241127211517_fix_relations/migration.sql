-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "AvailableJob" DROP CONSTRAINT "AvailableJob_jobDescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "AvailableJobRecruiter" DROP CONSTRAINT "AvailableJobRecruiter_availableJobId_fkey";

-- DropForeignKey
ALTER TABLE "AvailableJobRecruiter" DROP CONSTRAINT "AvailableJobRecruiter_recruiterId_fkey";

-- AddForeignKey
ALTER TABLE "AvailableJob" ADD CONSTRAINT "AvailableJob_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableJobRecruiter" ADD CONSTRAINT "AvailableJobRecruiter_availableJobId_fkey" FOREIGN KEY ("availableJobId") REFERENCES "AvailableJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableJobRecruiter" ADD CONSTRAINT "AvailableJobRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "AvailableJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;
