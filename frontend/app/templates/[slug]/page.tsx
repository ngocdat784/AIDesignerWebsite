import { notFound } from "next/navigation";

import { templateService } from "@/services/template.service";

import Breadcrumb from "@/components/sections/template-detail/Breadcrumb";
import TemplateGallery from "@/components/sections/template-detail/TemplateGallery";
import TemplateHeader from "@/components/sections/template-detail/TemplateHeader";
import TemplateStatistics from "@/components/sections/template-detail/TemplateStatistics";
import TemplatePriceCard from "@/components/sections/template-detail/TemplatePriceCard";
import TemplateDescription from "@/components/sections/template-detail/TemplateDescription";
import TemplateTechStack from "@/components/sections/template-detail/TemplateTechStack";
import TemplateIncludedFiles from "@/components/sections/template-detail/TemplateIncludedFiles";
import TemplateFeatures from "@/components/sections/template-detail/TemplateFeatures";
import TemplateInstallation from "@/components/sections/template-detail/TemplateInstallation";
import TemplateRequirements from "@/components/sections/template-detail/TemplateRequirements";
import TemplateChangelog from "@/components/sections/template-detail/TemplateChangelog";
import TemplateActions from "@/components/sections/template-detail/TemplateActions";
import RelatedTemplates from "@/components/sections/template-detail/RelatedTemplates";
import TemplateFeatures from "@/components/sections/template-detail/TemplateFeatures";
import TemplateInstallation from "@/components/sections/template-detail/TemplateInstallation";
import TemplateRequirements from "@/components/sections/template-detail/TemplateRequirements";
import TemplateChangelog from "@/components/sections/template-detail/TemplateChangelog";

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
      {/* =================================================== */}
      {/* Breadcrumb */}
      {/* =================================================== */}

      <Breadcrumb />

      {/* =================================================== */}
      {/* Gallery */}
      {/* */}
      {/* coverImage */}
      {/* gallery */}
      {/* images */}
      {/* =================================================== */}

      <TemplateGallery
        template={template}
      />

      {/* =================================================== */}
      {/* Header */}
      {/* */}
      {/* title */}
      {/* slug */}
      {/* category */}
      {/* author */}
      {/* premium */}
      {/* version */}
      {/* =================================================== */}

      <TemplateHeader
        template={template}
      />

      {/* =================================================== */}
      {/* Statistics */}
      {/* */}
      {/* rating */}
      {/* reviews */}
      {/* downloads */}
      {/* favorites */}
      {/* views */}
      {/* =================================================== */}

      <TemplateStatistics
        template={template}
      />

      {/* =================================================== */}
      {/* Price */}
      {/* */}
      {/* price */}
      {/* originalPrice */}
      {/* discountPrice */}
      {/* stock */}
      {/* =================================================== */}

      <TemplatePriceCard
        template={template}
      />

      {/* =================================================== */}
      {/* Actions */}
      {/* */}
      {/* Preview */}
      {/* Add to cart */}
      {/* Demo */}
      {/* =================================================== */}

      <TemplateActions
        template={template}
      />

      {/* =================================================== */}
      {/* Description */}
      {/* =================================================== */}

      <TemplateDescription
        template={template}
      />

      {/* =================================================== */}
      {/* Features */}
      {/* =================================================== */}

      <TemplateFeatures
        template={template}
      />

      {/* =================================================== */}
      {/* Technology */}
      {/* =================================================== */}

      <TemplateTechStack
        template={template}
      />

      {/* =================================================== */}
      {/* Included Files */}
      {/* =================================================== */}

      <TemplateIncludedFiles
        template={template}
      />

      {/* =================================================== */}
      {/* Installation */}
      {/* =================================================== */}

      <TemplateInstallation
        template={template}
      />

      {/* =================================================== */}
      {/* Requirements */}
      {/* =================================================== */}

      <TemplateRequirements
        template={template}
      />

      {/* =================================================== */}
      {/* Changelog */}
      {/* =================================================== */}

      <TemplateChangelog
        template={template}
      />

      {/* =================================================== */}
      {/* Related Templates */}
      {/* =================================================== */}

      <RelatedTemplates
        template={template}
        templates={relatedTemplates}
      />
      
    </main>
  );
}