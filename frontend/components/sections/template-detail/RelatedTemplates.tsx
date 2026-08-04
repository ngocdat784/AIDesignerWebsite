"use client";

import { templateService } from "@/services/template.service";

import TemplateCard from "@/components/sections/marketplace/TemplateCard";

import type {
  RelatedTemplatesProps,
} from "./types";

export default function RelatedTemplates({
  template,
}: RelatedTemplatesProps) {

  const related =
    templateService.getRelated(template);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold">
          Related Templates
        </h2>

        <p className="text-muted-foreground">
          You may also like these templates.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {related.map((item) => (
          <TemplateCard
            key={item.id}
            template={item}
          />
        ))}

      </div>

    </section>
  );
}