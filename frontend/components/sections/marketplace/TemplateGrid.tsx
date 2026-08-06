"use client";

import { useTemplates } from "@/hooks/useTemplates";
import TemplateCard from "./cards/TemplateCard";
import EmptyState from "./EmptyState";

export default function TemplateGrid() {
  const { featuredTemplates } = useTemplates();

  if (featuredTemplates.length === 0)
    return <EmptyState />;

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {featuredTemplates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
        />
      ))}
    </div>
  );
}