import type { MarketplaceTemplate } from "./types";

import TemplateListCard from "./cards/TemplateListCard";

interface MarketplaceListViewProps {
  templates: MarketplaceTemplate[];
}

export default function MarketplaceListView({
  templates,
}: MarketplaceListViewProps) {
  return (
    <div className="space-y-6">
      {templates.map((template) => (
        <TemplateListCard
          key={template.id}
          template={template}
        />
      ))}
    </div>
  );
}