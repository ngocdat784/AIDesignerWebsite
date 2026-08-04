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
import TemplateActions from "@/components/sections/template-detail/TemplateActions";
import RelatedTemplates from "@/components/sections/template-detail/RelatedTemplates";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TemplateDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const template = templateService.getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return (
    <main className="container py-10 space-y-10">
      <Breadcrumb />
      <TemplateGallery />
      <TemplateHeader template={template} />
      <TemplateStatistics template={template} />
      <TemplatePriceCard template={template} />
      <TemplateActions template={template} />
      <TemplateDescription template={template} />
      <TemplateTechStack template={template} />
      <TemplateIncludedFiles template={template} />
      <TemplateHeader template={template} />
      <RelatedTemplates />
    </main>
  );
}