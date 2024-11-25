-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "jobId" TEXT;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "AvailableJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;
