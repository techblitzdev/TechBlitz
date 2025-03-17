-- CreateTable
CREATE TABLE "PseoPages" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "metaTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "metaKeywords" TEXT[],
    "canonicalUrl" TEXT,
    "ogImage" TEXT,
    "targetingKeywords" TEXT[],
    "title" TEXT NOT NULL,
    "heroHeader" TEXT NOT NULL,
    "heroSubheader" TEXT NOT NULL,
    "leftHeader" TEXT,
    "leftSubheader" TEXT,
    "learnMoreLink" BOOLEAN NOT NULL DEFAULT false,
    "leftCta" JSONB,
    "roadmapTitle" TEXT,
    "roadmapDescription" TEXT,
    "questionHeader" TEXT,
    "questionSubheader" TEXT,
    "contentGridTitle" TEXT,
    "contentGridItems" JSONB[],
    "ctaTitle" TEXT,
    "ctaDescription" TEXT,
    "contentSections" JSONB[],
    "faqs" JSONB[],
    "marketingItems" JSONB[],
    "templateId" TEXT NOT NULL,
    "templateConfig" JSONB,
    "authorId" TEXT,
    "authorName" TEXT,
    "jsonLdTitle" TEXT,
    "jsonLdDescription" TEXT,

    CONSTRAINT "PseoPages_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "PseoPages_slug_key" ON "PseoPages"("slug");
