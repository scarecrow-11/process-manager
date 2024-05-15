-- DropForeignKey
ALTER TABLE "ProcessLog" DROP CONSTRAINT "ProcessLog_processId_fkey";

-- AddForeignKey
ALTER TABLE "ProcessLog" ADD CONSTRAINT "ProcessLog_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE CASCADE ON UPDATE CASCADE;
