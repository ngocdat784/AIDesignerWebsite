"use client";

import {
  Check,
  Terminal,
  ArrowRight,
} from "lucide-react";

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
          bg-gradient-to-br
          from-slate-50
          via-white
          to-blue-50/50
          px-6
          py-7
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
          <div>
            <div
              className="
                mb-2
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-600
              "
            >
              <Terminal className="h-3.5 w-3.5" />

              Setup Guide
            </div>

            <h2
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                sm:text-3xl
              "
            >
              Installation
            </h2>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
              "
            >
              Follow these steps to install,
              configure and run this template.
            </p>
          </div>

          {/* Step count */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              shadow-sm
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-slate-900
                text-sm
                font-bold
                text-white
              "
            >
              {steps.length}
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Total
              </p>

              <p className="text-sm font-semibold text-slate-900">
                {steps.length === 1
                  ? "Step"
                  : "Steps"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          STEPS
         ===================================================== */}

      <div className="p-6 sm:p-8">
        <div className="relative space-y-6">
          {steps.map((step, index) => {
            const isLast =
              index === steps.length - 1;

            return (
              <div
                key={`${step}-${index}`}
                className="relative flex gap-4 sm:gap-5"
              >
                {/* =================================================
                    CONNECTOR
                   ================================================= */}

                {!isLast && (
                  <div
                    className="
                      absolute
                      left-[19px]
                      top-12
                      h-[calc(100%+1.5rem)]
                      w-px
                      bg-gradient-to-b
                      from-blue-200
                      to-slate-200
                    "
                  />
                )}

                {/* =================================================
                    STEP NUMBER
                   ================================================= */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-blue-600
                    to-indigo-600
                    text-sm
                    font-bold
                    text-white
                    shadow-md
                    shadow-blue-600/20
                  "
                >
                  {isLast ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* =================================================
                    STEP CONTENT
                   ================================================= */}

                <div
                  className="
                    min-w-0
                    flex-1
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50/70
                    p-5
                    transition-all
                    duration-300
                    hover:border-blue-200
                    hover:bg-blue-50/30
                    hover:shadow-sm
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wider
                          text-blue-600
                        "
                      >
                        Step {index + 1}
                      </p>

                      <p
                        className="
                          mt-1
                          text-base
                          font-semibold
                          leading-7
                          text-slate-900
                        "
                      >
                        {step}
                      </p>
                    </div>

                    <div
                      className="
                        hidden
                        shrink-0
                        items-center
                        gap-1
                        text-xs
                        font-medium
                        text-slate-400
                        sm:flex
                      "
                    >
                      {isLast ? (
                        <>
                          Complete
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          FOOTER
         ===================================================== */}

      <div
        className="
          border-t
          border-slate-200
          bg-slate-50/70
          px-6
          py-4
          sm:px-8
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-500
          "
        >
          <Check className="h-4 w-4 text-green-500" />

          <span>
            Complete all steps to get your template
            running.
          </span>
        </div>
      </div>
    </section>
  );
}