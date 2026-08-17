
import { CheckCircle2 } from "lucide-react";

import type { Template } from "@/types/template/template";

interface TemplateRequirementsProps {
  template: Template;
}

export default function TemplateRequirements({
  template,
}: TemplateRequirementsProps) {
  const requirements =
    template.requirements ?? [];

  if (requirements.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Requirements
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Make sure your environment meets these requirements
          before installing the template.
        </p>
      </div>

      {/* Requirements */}

      <div
        className="
          rounded-2xl
          border
          bg-card
          p-5
        "
      >
        <div className="space-y-3">
          {requirements.map(
            (requirement, index) => (
              <div
                key={`${requirement}-${index}`}
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  p-2
                  transition-colors
                  hover:bg-muted/50
                "
              >
                <CheckCircle2
                  className="
                    mt-0.5
                    h-5
                    w-5
                    shrink-0
                    text-primary
                  "
                />

                <span
                  className="
                    text-sm
                    leading-6
                    text-foreground
                  "
                >
                  {requirement}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

