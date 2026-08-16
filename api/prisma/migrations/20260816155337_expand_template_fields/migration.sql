-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "changelog" JSONB,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "demoUrl" TEXT,
ADD COLUMN     "discountPrice" DOUBLE PRECISION,
ADD COLUMN     "favorites" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "includedFiles" JSONB,
ADD COLUMN     "installationSteps" TEXT[],
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "relatedTemplateIds" TEXT[],
ADD COLUMN     "requirements" TEXT[],
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'published',
ADD COLUMN     "techStack" TEXT[],
ADD COLUMN     "version" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Template_status_idx" ON "Template"("status");

-- CreateIndex
CREATE INDEX "Template_featured_idx" ON "Template"("featured");

-- CreateIndex
CREATE INDEX "Template_newest_idx" ON "Template"("newest");

-- CreateIndex
CREATE INDEX "Template_createdAt_idx" ON "Template"("createdAt");
