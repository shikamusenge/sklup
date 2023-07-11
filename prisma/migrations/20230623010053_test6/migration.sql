-- CreateEnum
CREATE TYPE "reportType" AS ENUM ('abuse', 'harassment', 'notlikes', 'content', 'spam');

-- CreateTable
CREATE TABLE "search" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "query" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,

    CONSTRAINT "search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" TEXT NOT NULL,
    "title" "reportType" NOT NULL DEFAULT 'abuse',
    "frequency" INTEGER NOT NULL,
    "ReportedItemType" TEXT NOT NULL,
    "reportedItemId" TEXT NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);
