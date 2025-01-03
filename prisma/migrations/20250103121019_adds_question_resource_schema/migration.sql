-- CreateTable
CREATE TABLE "QuestionResources" (
    "uid" TEXT NOT NULL,
    "questionUid" TEXT NOT NULL,
    "resource" TEXT NOT NULL,

    CONSTRAINT "QuestionResources_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "QuestionResources" ADD CONSTRAINT "QuestionResources_questionUid_fkey" FOREIGN KEY ("questionUid") REFERENCES "Questions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
