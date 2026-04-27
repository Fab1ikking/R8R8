-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "photoUrl" TEXT,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_sessionId_key" ON "Report"("sessionId");
