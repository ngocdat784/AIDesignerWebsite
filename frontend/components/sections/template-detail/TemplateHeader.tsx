import { Badge } from "@/components/ui/badge";

import type { TemplateDetailProps } from "./types";

import Rating from "@/components/common/Rating";

export default function TemplateHeader({
  template,
}: TemplateDetailProps) {
  return (
    <section className="space-y-6">

      <div className="space-y-3">

        <h1 className="text-4xl font-bold">
          {template.title}
        </h1>

        <p className="max-w-3xl text-lg text-muted-foreground">
          {template.description}
        </p>

      </div>

      <div className="flex flex-wrap gap-2">

        <Badge>
          {template.category}
        </Badge>

        {template.techStack.map((item) => (
          <Badge
            key={item}
            variant="secondary"
          >
            {item}
          </Badge>
        ))}

      </div>

      <div className="flex items-center gap-6">

        <Rating
          value={template.rating}
          reviewCount={template.reviewCount}
        />

        <span className="text-muted-foreground">
          by
          {" "}
          <strong>
            {template.author.name}
          </strong>
        </span>

      </div>

    </section>
  );
}