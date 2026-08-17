import { Check } from "lucide-react";

import type { Template } from "@/types/template/template";

interface TemplateFeaturesProps {
  template: Template;
}

export default function TemplateFeatures({
  template,
}: TemplateFeaturesProps) {
  const features = template.features ?? [];

  if (features.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Features
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Key features included in this template.
        </p>
      </div>

      {/* Features */}

      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
        "
      >
        {features.map((feature, index) => (
          <div
            key={`${feature}-${index}`}
            className="
              flex
              items-start
              gap-3
              rounded-xl
              border
              bg-card
              p-4
              transition-colors
              hover:border-primary/30
            "
          >
            <div
              className="
                mt-0.5
                flex
                h-6
                w-6
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-primary/10
                text-primary
              "
            >
              <Check className="h-4 w-4" />
            </div>

            <span
              className="
                text-sm
                leading-6
                text-foreground
              "
            >
              {feature}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}