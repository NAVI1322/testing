-- DropForeignKey
ALTER TABLE "AvailableJob" DROP CONSTRAINT "AvailableJob_recruiterId_fkey";

-- CreateTable
CREATE TABLE "_RecruiterJobs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RecruiterApplications" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecruiterJobs_AB_unique" ON "_RecruiterJobs"("A", "B");

-- CreateIndex
CREATE INDEX "_RecruiterJobs_B_index" ON "_RecruiterJobs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecruiterApplications_AB_unique" ON "_RecruiterApplications"("A", "B");

-- CreateIndex
CREATE INDEX "_RecruiterApplications_B_index" ON "_RecruiterApplications"("B");

-- AddForeignKey
ALTER TABLE "AvailableJob" ADD CONSTRAINT "AvailableJob_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecruiterJobs" ADD CONSTRAINT "_RecruiterJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "AvailableJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecruiterJobs" ADD CONSTRAINT "_RecruiterJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "Recruiter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecruiterApplications" ADD CONSTRAINT "_RecruiterApplications_A_fkey" FOREIGN KEY ("A") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecruiterApplications" ADD CONSTRAINT "_RecruiterApplications_B_fkey" FOREIGN KEY ("B") REFERENCES "Recruiter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
