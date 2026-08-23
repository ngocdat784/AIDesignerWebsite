import type { TemplateDetailProps } from "./types";

import TechBadge from "./tech-stack/TechBadge";
import Section from "./description/Section";

export default function TemplateTechStack({
  template,
}: TemplateDetailProps) {
  const techStack = template.techStack ?? [];

  if (techStack.length === 0) {
    return null;
  }

  return (
    <Section
      title="Tech Stack"
      number="03"
    >
      <div className="space-y-6">
        {/* Description */}

        <p
          className="
            max-w-3xl
            text-sm
            leading-7
            text-slate-500
            sm:text-base
          "
        >
          Technologies and tools used to build this
          template.
        </p>

        {/* Technologies */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50/70
            p-5
            sm:p-6
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            {techStack.map((tech) => (
              <div
                key={tech}
                className="
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:scale-[1.02]
                "
              >
                <TechBadge
                  tech={tech}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stack count */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
          "
        >
          <span
            className="
              text-sm
              text-slate-500
            "
          >
            Technologies included
          </span>

          <span
            className="
              text-sm
              font-semibold
              text-slate-900
            "
          >
            {techStack.length}
          </span>
        </div>
      </div>
    </Section>
  );
}