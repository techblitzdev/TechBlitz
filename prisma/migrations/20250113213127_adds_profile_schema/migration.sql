-- CreateTable
CREATE TABLE "Profile" (
    "uid" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "instagram" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "youtube" TEXT,
    "tiktok" TEXT,
    "twitch" TEXT,
    "website" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "country" TEXT,
    "timezone" TEXT,
    "company" TEXT,
    "jobTitle" TEXT,
    "yearsOfExperience" INTEGER,
    "programmingLanguages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "frameworks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "projects" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "showEmail" BOOLEAN NOT NULL DEFAULT false,
    "showLocation" BOOLEAN NOT NULL DEFAULT true,
    "accentColor" TEXT,
    "bannerImage" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "lastViewed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userUid_key" ON "Profile"("userUid");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
