/*
  Warnings:

  - You are about to drop the column `recruiterId` on the `AvailableJob` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AvailableJob" DROP CONSTRAINT "AvailableJob_recruiterId_fkey";

-- AlterTable
ALTER TABLE "AvailableJob" DROP COLUMN "recruiterId";

-- CreateTable
CREATE TABLE "_AvailableJobToRecruiter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AvailableJobToRecruiter_AB_unique" ON "_AvailableJobToRecruiter"("A", "B");

-- CreateIndex
CREATE INDEX "_AvailableJobToRecruiter_B_index" ON "_AvailableJobToRecruiter"("B");

-- AddForeignKey
ALTER TABLE "_AvailableJobToRecruiter" ADD CONSTRAINT "_AvailableJobToRecruiter_A_fkey" FOREIGN KEY ("A") REFERENCES "AvailableJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailableJobToRecruiter" ADD CONSTRAINT "_AvailableJobToRecruiter_B_fkey" FOREIGN KEY ("B") REFERENCES "Recruiter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
