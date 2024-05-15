-- CreateTable
CREATE TABLE "ProcessLog" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processId" INTEGER NOT NULL,

    CONSTRAINT "ProcessLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProcessLog" ADD CONSTRAINT "ProcessLog_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
