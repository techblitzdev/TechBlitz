-- CreateTable
CREATE TABLE "AIPrompts" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prompt" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AIPrompts_pkey" PRIMARY KEY ("uid")
);
