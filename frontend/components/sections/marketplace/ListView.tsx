import { Template } from "@/types";

import TemplateListCard from "./cards/TemplateListCard";

interface Props {
  templates: Template[];
}

export default function MarketplaceListView({
  templates,
}: Props) {
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