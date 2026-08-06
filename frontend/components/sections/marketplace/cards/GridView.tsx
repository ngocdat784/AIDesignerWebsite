import { Template } from "@/types";

import TemplateCard from "./TemplateCard";

interface Props {
  templates: Template[];
}

export default function MarketplaceGridView({
  templates,
}: Props) {
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