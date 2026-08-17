import type { Template } from "@/types/template/template";

interface TemplateInstallationProps {
  template: Template;
}

export default function TemplateInstallation({
  template,
}: TemplateInstallationProps) {
  const steps =
    template.installationSteps ?? [];

  if (steps.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Installation
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Follow these steps to install and run the template.
        </p>
      </div>

      {/* Steps */}

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={`${step}-${index}`}
            className="
              flex
              items-start
              gap-4
              rounded-xl
              border
              bg-card
              p-4
            "
          >
            {/* Step number */}

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-primary
                text-sm
                font-semibold
                text-primary-foreground
              "
            >
              {index + 1}
            </div>

            {/* Step content */}

            <div className="min-w-0 pt-1">
              <p
                className="
                  text-sm
                  font-medium
                  leading-6
                "
              >
                {step}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}