-- CreateEnum
CREATE TYPE "userLevel" AS ENUM ('STANDARD', 'ADMIN', 'TRIAL', 'FREE');

-- CreateTable
CREATE TABLE "Users" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "userLevel" "userLevel" NOT NULL DEFAULT 'STANDARD',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Questions" (
    "uid" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Answers" (
    "uid" TEXT NOT NULL,
    "userAnswer" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionDate" TIMESTAMP(3) NOT NULL,
    "timeTaken" INTEGER,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "userAnswers" FOREIGN KEY ("uid") REFERENCES "Users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Questions"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
