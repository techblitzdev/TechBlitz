-- CreateTable
CREATE TABLE "DemoAnswers" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionUid" TEXT NOT NULL,
    "correctAnswer" BOOLEAN NOT NULL DEFAULT false,
    "userAnswer" TEXT NOT NULL,
    "timeTaken" INTEGER,

    CONSTRAINT "DemoAnswers_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "DemoAnswers" ADD CONSTRAINT "DemoAnswers_questionUid_fkey" FOREIGN KEY ("questionUid") REFERENCES "Questions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
