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
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
        />
      ))}
    </div>
  );
}