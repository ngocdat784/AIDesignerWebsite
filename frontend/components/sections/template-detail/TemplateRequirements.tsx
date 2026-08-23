import {
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

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
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
      "
    >
      {/* =====================================================
          HEADER
         ===================================================== */}

      <div
        className="
          border-b
          border-slate-200
          bg-gradient-to-r
          from-slate-50
          via-white
          to-blue-50/50
          px-6
          py-6
          sm:px-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-start gap-4">
            {/* Icon */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-primary/10
                text-primary
              "
            >
              <ShieldCheck className="h-5 w-5" />
            </div>

            {/* Title */}

            <div>
              <h2
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-900
                "
              >
                Requirements
              </h2>

              <p
                className="
                  mt-1
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Make sure your environment meets
                these requirements before installing
                the template.
              </p>
            </div>
          </div>

          {/* Count */}

          <div
            className="
              inline-flex
              w-fit
              items-center
              rounded-full
              bg-slate-100
              px-3
              py-1.5
              text-xs
              font-semibold
              text-slate-600
            "
          >
            {requirements.length}{" "}
            {requirements.length === 1
              ? "Requirement"
              : "Requirements"}
          </div>
        </div>
      </div>

      {/* =====================================================
          REQUIREMENTS
         ===================================================== */}

      <div className="p-6 sm:p-8">
        <div
          className="
            grid
            gap-3
            sm:grid-cols-2
          "
        >
          {requirements.map(
            (requirement, index) => (
              <div
                key={`${requirement}-${index}`}
                className="
                  group
                  flex
                  items-start
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50/60
                  p-4
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-primary/30
                  hover:bg-white
                  hover:shadow-sm
                "
              >
                {/* Number */}

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-sm
                    font-bold
                    text-slate-500
                    shadow-sm
                    ring-1
                    ring-slate-200
                    transition-colors
                    duration-200
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                    group-hover:ring-primary
                  "
                >
                  {index + 1}
                </div>

                {/* Content */}

                <div className="min-w-0 pt-0.5">
                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      className="
                        mt-0.5
                        h-4
                        w-4
                        shrink-0
                        text-primary
                      "
                    />

                    <p
                      className="
                        text-sm
                        font-medium
                        leading-6
                        text-slate-700
                      "
                    >
                      {requirement}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}