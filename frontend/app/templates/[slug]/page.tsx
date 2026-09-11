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

  const template = await templateService.getBySlug(slug);

  // =========================================================
  // Not found
  // =========================================================

  if (!template) {
    notFound();
  }

  // =========================================================
  // Related templates
  // =========================================================

  const relatedTemplates = await templateService.getRelated(
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

      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <Breadcrumb
          currentLabel={template.title}
        />
      </div>

      {/* ===================================================
          2. Gallery
         =================================================== */}

      <div
        style={{
          marginBottom: "32px",
        }}
      >
        <TemplateGallery
          template={template}
        />
      </div>

      {/* ===================================================
          3. Header
         =================================================== */}

      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <TemplateHeader
          template={template}
        />
      </div>

      {/* ===================================================
          4. Statistics
         =================================================== */}

      <div
        style={{
          marginBottom: "32px",
        }}
      >
        <TemplateStatistics
          template={template}
        />
      </div>

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
        style={{
          marginBottom: "48px",
        }}
      >
        <TemplatePriceCard
          template={template}
        />

        <TemplateActions
          template={template}
        />
      </div>

      {/* ===================================================
          6. Overview
         =================================================== */}

      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <Overview
          template={template}
        />
      </div>

      {/* ===================================================
          7. Features
         =================================================== */}

      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <TemplateFeatures
          template={template}
        />
      </div>

      {/* ===================================================
          8. Tech Stack
         =================================================== */}

      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <TemplateTechStack
          template={template}
        />
      </div>

      {/* ===================================================
          9. Included Files
         =================================================== */}

      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <TemplateIncludedFiles
          template={template}
        />
      </div>

      {/* ===================================================
          10. Installation
         =================================================== */}

      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <TemplateInstallation
          template={template}
        />
      </div>

      {/* ===================================================
          11. Requirements
         =================================================== */}

      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <TemplateRequirements
          template={template}
        />
      </div>

      {/* ===================================================
          12. Changelog
         =================================================== */}

      <div
        style={{
          marginBottom: "48px",
        }}
      >
        <TemplateChangelog
          template={template}
        />
      </div>

      {/* ===================================================
          13. Related Templates
         =================================================== */}

      <RelatedTemplates
        template={template}
      />
    </main>
  );
}