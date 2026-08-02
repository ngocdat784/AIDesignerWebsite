"use client";

import { useTemplates } from "@/hooks/useTemplates";
import TemplateCard from "@/components/sections/marketplace/TemplateCard";

export default function MarketplaceGrid() {
  const { templates } = useTemplates();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
        />
      ))}
    </div>
  );
}