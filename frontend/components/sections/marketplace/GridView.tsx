"use client";

import type { MarketplaceTemplate } from "./types";
import TemplateCard from "./cards/TemplateCard";

interface MarketplaceGridViewProps {
  templates: MarketplaceTemplate[];
}

export default function MarketplaceGridView({
  templates,
}: MarketplaceGridViewProps) {
  return (
    <div
      className="
        grid
        w-full
        grid-cols-1
        gap-x-6
        gap-y-8
        md:grid-cols-2
        xl:grid-cols-3
      "
      style={{
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {templates.map((template) => (
        <div
          key={template.id}
          className="min-w-0 w-full"
        >
          <TemplateCard
            template={template}
          />
        </div>
      ))}
    </div>
  );
}