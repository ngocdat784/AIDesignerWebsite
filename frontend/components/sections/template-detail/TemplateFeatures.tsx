import { Check, Sparkles } from "lucide-react";

import type { Template } from "@/types/template/template";

import Section from "./description/Section";

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
    <Section
      title="Features"
      number="02"
    >
      {/* Description */}

      <p
        className="
          mt-5
          max-w-3xl
          text-sm
          leading-7
          text-slate-500
          sm:text-base
        "
      >
        Key features included in this template.
      </p>

      {/* Features Grid */}

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {features.map((feature, index) => (
          <div
            key={`${feature}-${index}`}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-slate-50/70
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-primary/30
              hover:bg-white
              hover:shadow-md
            "
          >
            {/* Decorative glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-8
                -top-8
                h-20
                w-20
                rounded-full
                bg-primary/5
                blur-2xl
                transition-all
                duration-300
                group-hover:bg-primary/10
              "
            />

            <div
              className="
                relative
                z-10
                flex
                items-start
                gap-4
              "
            >
              {/* Icon */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                  transition-all
                  duration-300
                  group-hover:scale-105
                  group-hover:bg-primary
                  group-hover:text-white
                "
              >
                <Check className="h-5 w-5" />
              </div>

              {/* Content */}

              <div className="min-w-0">
                <div
                  className="
                    mb-1
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Sparkles
                    className="
                      h-3.5
                      w-3.5
                      text-primary/60
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Feature {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p
                  className="
                    text-sm
                    font-medium
                    leading-6
                    text-slate-800
                  "
                >
                  {feature}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}