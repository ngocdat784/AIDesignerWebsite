"use client";

import TemplateCard from "@/components/sections/marketplace/TemplateCard";
import { useMarketplace } from "./hooks/useMarketplace";

export default function MarketplaceGrid() {
  const { templates } = useMarketplace();

  if (templates.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed">
        <p className="text-muted-foreground">
          No templates found.
        </p>
      </div>
    );
  }

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