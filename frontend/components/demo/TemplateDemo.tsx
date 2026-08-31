"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Check,
} from "lucide-react";

import type { Template } from "@/types/template/template";

import AiSaasLandingPage, {
  type AiSaasStyleId,
} from "@/components/templates/ai-saas/AiSaasLandingPage";

// =========================================================
// TYPES
// =========================================================

interface TemplateDemoProps {
  template: Template;
}

// =========================================================
// STYLE OPTIONS
// =========================================================

const STYLE_OPTIONS: {
  id: AiSaasStyleId;
  label: string;
  description: string;
}[] = [
  {
    id: "modern",
    label: "Modern",
    description: "Modern SaaS",
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Clean & simple",
  },
  {
    id: "dark",
    label: "Dark",
    description: "Dark technology",
  },
  {
    id: "glass",
    label: "Glass",
    description: "Glassmorphism",
  },
];

// =========================================================
// COMPONENT
// =========================================================

export default function TemplateDemo({
  template,
}: TemplateDemoProps) {
  /**
   * Style mặc định:
   *
   * Nếu template có styleId thì dùng style đó.
   * Nếu chưa có thì mặc định modern.
   */
  const initialStyle =
    isValidStyle(template.styleId)
      ? template.styleId
      : "modern";

  const [selectedStyle, setSelectedStyle] =
    useState<AiSaasStyleId>(initialStyle);

  return (
    <main className="min-h-screen bg-slate-100">
      {/* =====================================================
          DEMO TOOLBAR
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-[100]
          border-b
          border-slate-200
          bg-white/95
          shadow-sm
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[72px]
            w-full
            max-w-[1600px]
            items-center
            justify-between
            gap-6
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="flex min-w-0 items-center gap-4">
            <Link
              href={`/templates/${template.slug}`}
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                py-2
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:border-indigo-200
                hover:bg-indigo-50
                hover:text-indigo-600
              "
            >
              <ArrowLeft className="h-4 w-4" />

              <span className="hidden sm:inline">
                Back
              </span>
            </Link>

            <div className="min-w-0">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-indigo-500
                "
              >
                Live Demo
              </p>

              <h1
                className="
                  truncate
                  text-sm
                  font-bold
                  text-slate-950
                  sm:text-base
                "
              >
                {template.title}
              </h1>
            </div>
          </div>

          {/* =================================================
              STYLE SELECTOR
          ================================================= */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-1
            "
          >
            {STYLE_OPTIONS.map((style) => {
              const active =
                selectedStyle === style.id;

              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() =>
                    setSelectedStyle(style.id)
                  }
                  title={style.description}
                  className={`
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    font-bold
                    transition-all
                    duration-200
                    sm:px-4
                    ${
                      active
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-white hover:text-indigo-600"
                    }
                  `}
                >
                  {style.label}
                </button>
              );
            })}
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-200
                bg-emerald-50
                px-3
                py-1.5
                text-xs
                font-semibold
                text-emerald-700
              "
            >
              <Check className="h-3.5 w-3.5" />

              Preview Mode
            </div>

            {template.demoUrl && (
              <a
                href={template.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-slate-700
                  transition
                  hover:border-indigo-200
                  hover:bg-indigo-50
                  hover:text-indigo-600
                "
              >
                Open Demo

                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* =====================================================
          PREVIEW AREA
      ===================================================== */}

      <div className="w-full">
        <AiSaasLandingPage
          styleId={selectedStyle}
        />
      </div>
    </main>
  );
}

// =========================================================
// HELPERS
// =========================================================

function isValidStyle(
  value?: string | null,
): value is AiSaasStyleId {
  return (
    value === "modern" ||
    value === "minimal" ||
    value === "dark" ||
    value === "glass"
  );
}