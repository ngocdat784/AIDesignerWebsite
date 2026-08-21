import { notFound } from "next/navigation";

import { templateService } from "@/services/template.service";

import Breadcrumb from "@/components/sections/template-detail/Breadcrumb";
import TemplateGallery from "@/components/sections/template-detail/TemplateGallery";
import TemplateHeader from "@/components/sections/template-detail/TemplateHeader";
import TemplateStatistics from "@/components/sections/template-detail/TemplateStatistics";
import TemplatePriceCard from "@/components/sections/template-detail/TemplatePriceCard";
import TemplateActions from "@/components/sections/template-detail/TemplateActions";
import TemplateTechStack from "@/components/sections/template-detail/TemplateTechStack";
import TemplateIncludedFiles from "@/components/sections/template-detail/TemplateIncludedFiles";
import TemplateInstallation from "@/components/sections/template-detail/TemplateInstallation";
import TemplateRequirements from "@/components/sections/template-detail/TemplateRequirements";
import TemplateChangelog from "@/components/sections/template-detail/TemplateChangelog";
import RelatedTemplates from "@/components/sections/template-detail/RelatedTemplates";
import TemplateFeatures from "@/components/sections/template-detail/TemplateFeatures";

import Overview from "@/components/sections/template-detail/description/Overview";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TemplateDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  // =========================================================
  // Get template
  // =========================================================

  const template =
    await templateService.getBySlug(slug);

  // =========================================================
  // Not found
  // =========================================================

  if (!template) {
    notFound();
  }

  // =========================================================
  // Related templates
  // =========================================================

  const relatedTemplates =
    await templateService.getRelated(
      template,
      3,
    );

  return (
    <main
      className="
        container
        mx-auto
        space-y-10
        px-4
        py-8
        sm:px-6
        sm:py-10
        lg:px-8
      "
    >
      {/* ===================================================
          1. Breadcrumb
         =================================================== */}

      <Breadcrumb
        currentLabel={template.title}
      />

      {/* ===================================================
          2. Gallery
         =================================================== */}

      <TemplateGallery
        template={template}
      />

      {/* ===================================================
          3. Header
         =================================================== */}

      <TemplateHeader
        template={template}
      />

      {/* ===================================================
          4. Statistics
         =================================================== */}

      <TemplateStatistics
        template={template}
      />

      {/* ===================================================
          5. Price + Actions
         =================================================== */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
          lg:items-start
        "
      >
        {/* Price */}

        <TemplatePriceCard
          template={template}
        />

        {/* Actions */}

        <TemplateActions
          template={template}
        />
      </div>

      {/* ===================================================
          6. Overview
         =================================================== */}

      <Overview
        template={template}
      />

      {/* ===================================================
          7. Features
         =================================================== */}

      <TemplateFeatures
        template={template}
      />

      {/* ===================================================
          8. Tech Stack
         =================================================== */}

      <TemplateTechStack
        template={template}
      />

      {/* ===================================================
          9. Included Files
         =================================================== */}

      <TemplateIncludedFiles
        template={template}
      />

      {/* ===================================================
          10. Installation
         =================================================== */}

      <TemplateInstallation
        template={template}
      />

      {/* ===================================================
          11. Requirements
         =================================================== */}

      <TemplateRequirements
        template={template}
      />

      {/* ===================================================
          12. Changelog
         =================================================== */}

      <TemplateChangelog
        template={template}
      />

      {/* ===================================================
          13. Related Templates
         =================================================== */}

      <RelatedTemplates
        template={template}
        templates={relatedTemplates}
      />
    </main>
  );
}