/*
  Warnings:

  - A unique constraint covering the columns `[pid]` on the table `Process` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Process_pid_key" ON "Process"("pid");
