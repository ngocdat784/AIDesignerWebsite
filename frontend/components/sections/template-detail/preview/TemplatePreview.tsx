"use client";

import type { TemplateDetailProps } from "../types";
import type { TemplatePreviewStyle } from "./types";

import TemplateHeader from "../TemplateHeader";
import TemplateGallery from "../TemplateGallery";
import TemplateDescription from "../TemplateDescription";
import TemplateActions from "../TemplateActions";

interface TemplatePreviewProps
  extends TemplateDetailProps {
  style: TemplatePreviewStyle;
}

export default function TemplatePreview({
  template,
  style,
}: TemplatePreviewProps) {
  return (
    <div
      className={`
        template-preview
        min-h-full
        transition-all
        duration-500
        ease-in-out

        ${
          style === "modern"
            ? "bg-background text-foreground"
            : ""
        }

        ${
          style === "minimal"
            ? "bg-white text-slate-900"
            : ""
        }

        ${
          style === "dark"
            ? "bg-slate-950 text-slate-100"
            : ""
        }

        ${
          style === "glass"
            ? `
              bg-gradient-to-br
              from-slate-950
              via-slate-900
              to-indigo-950
              text-white
            `
            : ""
        }
      `}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =========================
            Header
           ========================= */}

        <div
          className={`
            transition-all
            duration-500

            ${
              style === "minimal"
                ? "mb-12"
                : "mb-8"
            }
          `}
        >
          <TemplateHeader
            template={template}
            variant={style}
          />
        </div>

        {/* =========================
            Main Preview
           ========================= */}

        <div
          className={`
            grid
            gap-8
            transition-all
            duration-500

            ${
              style === "minimal"
                ? "lg:grid-cols-[1fr_320px]"
                : "lg:grid-cols-[1fr_360px]"
            }
          `}
        >

          {/* =========================
              Main Content
             ========================= */}

          <main className="min-w-0 space-y-8">

            <TemplateGallery
              template={template}
              variant={style}
            />

            <TemplateDescription
              template={template}
              variant={style}
            />

          </main>

          {/* =========================
              Actions
             ========================= */}

          <aside
            className={`
              lg:sticky
              lg:top-24
              lg:self-start

              transition-all
              duration-500

              ${
                style === "glass"
                  ? `
                    rounded-3xl
                    border
                    border-white/20
                    bg-white/10
                    p-5
                    shadow-2xl
                    backdrop-blur-xl
                  `
                  : ""
              }

              ${
                style === "dark"
                  ? `
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                  `
                  : ""
              }
            `}
          >
            <TemplateActions
              template={template}
              variant={style}
            />
          </aside>

        </div>
      </div>
    </div>
  );
}