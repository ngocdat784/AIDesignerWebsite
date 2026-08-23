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
        px-4
        py-6
        sm:px-6
        sm:py-8
        lg:px-8
      "
    >
      {/* ===================================================
          1. Breadcrumb
         =================================================== */}

      <div className="mb-5 sm:mb-6">
        <Breadcrumb
          currentLabel={template.title}
        />
      </div>

      {/* ===================================================
          2. Gallery
         =================================================== */}

      <div className="mb-6 sm:mb-8">
        <TemplateGallery
          template={template}
        />
      </div>

      {/* ===================================================
          3. Header
         =================================================== */}

      <div className="mb-5 sm:mb-6">
        <TemplateHeader
          template={template}
        />
      </div>

      {/* ===================================================
          4. Statistics
         =================================================== */}

      <div className="mb-6 sm:mb-8">
        <TemplateStatistics
          template={template}
        />
      </div>

      {/* ===================================================
          5. Price + Actions
         =================================================== */}

      <div
        className="
          mb-10
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

      <div className="mb-8 sm:mb-10">
        <Overview
          template={template}
        />
      </div>

      {/* ===================================================
          7. Features
         =================================================== */}

      <div className="mb-8 sm:mb-10">
        <TemplateFeatures
          template={template}
        />
      </div>

      {/* ===================================================
          8. Tech Stack
         =================================================== */}

      <div className="mb-8 sm:mb-10">
        <TemplateTechStack
          template={template}
        />
      </div>

      {/* ===================================================
          9. Included Files
         =================================================== */}

      <div className="mb-8 sm:mb-10">
        <TemplateIncludedFiles
          template={template}
        />
      </div>

      {/* ===================================================
          10. Installation
         =================================================== */}

      <div className="mb-8 sm:mb-10">
        <TemplateInstallation
          template={template}
        />
      </div>

      {/* ===================================================
          11. Requirements
         =================================================== */}

      <div className="mb-8 sm:mb-10">
        <TemplateRequirements
          template={template}
        />
      </div>

      {/* ===================================================
          12. Changelog
         =================================================== */}

      <div className="mb-10 sm:mb-12">
        <TemplateChangelog
          template={template}
        />
      </div>

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