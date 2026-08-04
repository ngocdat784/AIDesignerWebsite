import type { TemplateDetailProps } from "./types";

import TechBadge from "./tech-stack/TechBadge";

export default function TemplateTechStack({
  template,
}: TemplateDetailProps) {
  return (
    <section className="space-y-5 rounded-2xl border bg-card p-6">

      <h2 className="text-2xl font-semibold">
        Tech Stack
      </h2>

      <div className="flex flex-wrap gap-3">

        {template.techStack.map((tech) => (
          <TechBadge
            key={tech}
            tech={tech}
          />
        ))}

      </div>

    </section>
  );
}