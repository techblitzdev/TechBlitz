-- Step 1: Add columns with defaults
ALTER TABLE "Answers" ADD COLUMN IF NOT EXISTS "userUid" TEXT DEFAULT 'legacy_user';
ALTER TABLE "Answers" ADD COLUMN IF NOT EXISTS "questionUid" TEXT DEFAULT 'legacy_question';
ALTER TABLE "Answers" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- Step 2: Update existing records with proper references if possible
-- You might want to add custom logic here to map existing answers to proper users/questions

-- Step 3: Make columns required
ALTER TABLE "Answers" ALTER COLUMN "userUid" SET NOT NULL;
ALTER TABLE "Answers" ALTER COLUMN "questionUid" SET NOT NULL;
ALTER TABLE "Answers" ALTER COLUMN "updatedAt" SET NOT NULL;