-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "pid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);
