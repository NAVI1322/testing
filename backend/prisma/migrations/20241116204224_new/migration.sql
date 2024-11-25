/*
  Warnings:

  - You are about to drop the `_AvailableJobToRecruiter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AvailableJobToRecruiter" DROP CONSTRAINT "_AvailableJobToRecruiter_A_fkey";

-- DropForeignKey
ALTER TABLE "_AvailableJobToRecruiter" DROP CONSTRAINT "_AvailableJobToRecruiter_B_fkey";

-- DropTable
DROP TABLE "_AvailableJobToRecruiter";

-- CreateTable
CREATE TABLE "AvailableJobRecruiter" (
    "id" TEXT NOT NULL,
    "availableJobId" TEXT NOT NULL,
    "recruiterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvailableJobRecruiter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AvailableJobRecruiter" ADD CONSTRAINT "AvailableJobRecruiter_availableJobId_fkey" FOREIGN KEY ("availableJobId") REFERENCES "AvailableJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableJobRecruiter" ADD CONSTRAINT "AvailableJobRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
