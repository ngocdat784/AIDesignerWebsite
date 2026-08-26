-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "styleId" TEXT,
ADD COLUMN     "styleName" TEXT,
ADD COLUMN     "styleSlug" TEXT;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "styleId" TEXT;

-- CreateTable
CREATE TABLE "TemplateStyle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "colors" JSONB,
    "gradients" JSONB,
    "typography" JSONB,
    "layout" JSONB,
    "previewImage" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplateStyle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemplateStyle_slug_key" ON "TemplateStyle"("slug");

-- CreateIndex
CREATE INDEX "TemplateStyle_isActive_idx" ON "TemplateStyle"("isActive");

-- CreateIndex
CREATE INDEX "TemplateStyle_createdAt_idx" ON "TemplateStyle"("createdAt");

-- CreateIndex
CREATE INDEX "OrderItem_styleId_idx" ON "OrderItem"("styleId");

-- CreateIndex
CREATE INDEX "Template_styleId_idx" ON "Template"("styleId");

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "TemplateStyle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
