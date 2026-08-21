import { notFound } from "next/navigation";

import { templateService } from "@/services/template.service";
import TemplateDemo from "@/components/demo/TemplateDemo";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DemoPage({
  params,
}: Props) {
  const { slug } = await params;

  const template =
    await templateService.getBySlug(slug);

  if (!template) {
    notFound();
  }

  return (
    <TemplateDemo
      template={template}
    />
  );
}