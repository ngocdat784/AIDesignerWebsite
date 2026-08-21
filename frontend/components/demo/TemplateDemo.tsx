"use client";

import { useState } from "react";
import type { TemplateDetailProps } from "@/components/sections/template-detail/types";

type DemoStyle =
  | "modern"
  | "minimal"
  | "dark"
  | "glass";

interface Props extends TemplateDetailProps {}

const styles: {
  id: DemoStyle;
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

export default function TemplateDemo({
  template,
}: Props) {
  const [style, setStyle] =
    useState<DemoStyle>("modern");

  const currentStyle =
    getStyleConfig(style);

  return (
    <main
      className={`min-h-screen transition-all duration-500 ${currentStyle.page}`}
    >
      {/* =====================================================
          DEMO TOOLBAR
      ===================================================== */}

      <div
        className={`sticky top-0 z-50 border-b backdrop-blur-xl ${currentStyle.toolbar}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          {/* Template name */}

          <div className="min-w-0">
            <p
              className={`text-xs font-medium uppercase tracking-wider ${currentStyle.muted}`}
            >
              Live Demo
            </p>

            <h1
              className={`truncate text-sm font-semibold sm:text-base ${currentStyle.text}`}
            >
              {template.title}
            </h1>
          </div>

          {/* Style selector */}

          <div className="flex shrink-0 items-center gap-2 rounded-xl border p-1">
            {styles.map((item) => {
              const active =
                style === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setStyle(item.id)
                  }
                  className={`
                    rounded-lg px-3 py-2
                    text-xs font-medium
                    transition-all duration-200
                    sm:px-4
                    ${
                      active
                        ? currentStyle.selectorActive
                        : currentStyle.selector
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          DEMO CONTENT
      ===================================================== */}

      <section className="relative overflow-hidden">
        {/* Background decoration */}

        <div
          className={`pointer-events-none absolute inset-0 ${currentStyle.background}`}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          {/* =================================================
              HERO
          ================================================= */}

          <div className="mx-auto max-w-4xl text-center">
            <div
              className={`mb-6 inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium ${currentStyle.badge}`}
            >
              AI SaaS Template
            </div>

            <h2
              className={`text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl ${currentStyle.heading}`}
            >
              {template.title}
            </h2>

            <p
              className={`mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg ${currentStyle.description}`}
            >
              {template.description}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${currentStyle.primaryButton}`}
              >
                Get Started
              </button>

              <button
                type="button"
                className={`rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-300 ${currentStyle.secondaryButton}`}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* =================================================
              HERO PREVIEW
          ================================================= */}

          <div
            className={`mx-auto mt-16 max-w-6xl overflow-hidden rounded-3xl border ${currentStyle.preview}`}
          >
            <div
              className={`flex items-center gap-2 border-b px-5 py-4 ${currentStyle.previewHeader}`}
            >
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
              <div>
                <p
                  className={`text-sm font-medium ${currentStyle.accent}`}
                >
                  AI PLATFORM
                </p>

                <h3
                  className={`mt-3 text-3xl font-bold ${currentStyle.heading}`}
                >
                  Build smarter products with AI
                </h3>

                <p
                  className={`mt-4 leading-7 ${currentStyle.description}`}
                >
                  Create powerful AI experiences,
                  automate workflows and launch
                  modern digital products faster.
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    className={`rounded-lg px-5 py-2.5 text-sm font-semibold ${currentStyle.primaryButton}`}
                  >
                    Start Building
                  </button>

                  <button
                    type="button"
                    className={`rounded-lg border px-5 py-2.5 text-sm font-semibold ${currentStyle.secondaryButton}`}
                  >
                    View Demo
                  </button>
                </div>
              </div>

              <div
                className={`flex min-h-[260px] items-center justify-center rounded-2xl border ${currentStyle.visual}`}
              >
                <div className="text-center">
                  <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl text-3xl font-bold ${currentStyle.icon}`}
                  >
                    AI
                  </div>

                  <p
                    className={`mt-4 text-sm font-medium ${currentStyle.text}`}
                  >
                    Intelligent platform
                  </p>

                  <p
                    className={`mt-1 text-xs ${currentStyle.muted}`}
                  >
                    Powered by modern technology
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="mt-24">
            <div className="mx-auto max-w-2xl text-center">
              <p
                className={`text-sm font-semibold uppercase tracking-wider ${currentStyle.accent}`}
              >
                Features
              </p>

              <h3
                className={`mt-3 text-3xl font-bold ${currentStyle.heading}`}
              >
                Everything you need
              </h3>

              <p
                className={`mt-4 ${currentStyle.description}`}
              >
                A complete modern foundation for
                building your next AI product.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "AI Product Showcase",
                  description:
                    "Present your AI products and services with a modern visual experience.",
                },
                {
                  title: "Responsive Design",
                  description:
                    "Optimized layouts for desktop, tablet and mobile devices.",
                },
                {
                  title: "Modern Interface",
                  description:
                    "Clean components, animations and polished interactions.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className={`rounded-2xl border p-6 transition-all duration-300 ${currentStyle.card}`}
                >
                  <div
                    className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl font-semibold ${currentStyle.icon}`}
                  >
                    +
                  </div>

                  <h4
                    className={`text-lg font-semibold ${currentStyle.text}`}
                  >
                    {feature.title}
                  </h4>

                  <p
                    className={`mt-3 text-sm leading-7 ${currentStyle.description}`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              CTA
          ================================================= */}

          <div
            className={`mt-24 rounded-3xl border p-8 text-center sm:p-12 lg:p-16 ${currentStyle.cta}`}
          >
            <h3
              className={`text-3xl font-bold sm:text-4xl ${currentStyle.heading}`}
            >
              Ready to build something amazing?
            </h3>

            <p
              className={`mx-auto mt-4 max-w-xl leading-7 ${currentStyle.description}`}
            >
              Start with this template and customize
              it for your next project.
            </p>

            <button
              type="button"
              className={`mt-7 rounded-xl px-6 py-3 text-sm font-semibold ${currentStyle.primaryButton}`}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   STYLE CONFIGURATION
========================================================= */

function getStyleConfig(style: DemoStyle) {
  switch (style) {
    case "minimal":
      return {
        page:
          "bg-white text-gray-900",
        toolbar:
          "border-gray-200 bg-white/90",
        background:
          "bg-gradient-to-b from-white via-gray-50 to-white",
        text:
          "text-gray-900",
        heading:
          "text-gray-950",
        muted:
          "text-gray-500",
        description:
          "text-gray-600",
        accent:
          "text-gray-900",
        badge:
          "border-gray-200 bg-gray-50 text-gray-700",
        selector:
          "text-gray-600 hover:bg-gray-100",
        selectorActive:
          "bg-gray-900 text-white",
        primaryButton:
          "bg-gray-900 text-white hover:bg-gray-800",
        secondaryButton:
          "border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
        preview:
          "border-gray-200 bg-white shadow-sm",
        previewHeader:
          "border-gray-200 bg-gray-50",
        visual:
          "border-gray-200 bg-gray-50",
        icon:
          "bg-gray-900 text-white",
        card:
          "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm",
        cta:
          "border-gray-200 bg-gray-50",
      };

    case "dark":
      return {
        page:
          "bg-[#09090b] text-white",
        toolbar:
          "border-white/10 bg-[#09090b]/90",
        background:
          "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.16),transparent_45%)]",
        text:
          "text-white",
        heading:
          "text-white",
        muted:
          "text-zinc-500",
        description:
          "text-zinc-400",
        accent:
          "text-indigo-400",
        badge:
          "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
        selector:
          "text-zinc-400 hover:bg-white/5",
        selectorActive:
          "bg-indigo-500 text-white",
        primaryButton:
          "bg-indigo-500 text-white hover:bg-indigo-400",
        secondaryButton:
          "border-white/10 bg-white/5 text-white hover:bg-white/10",
        preview:
          "border-white/10 bg-zinc-950 shadow-2xl shadow-indigo-500/10",
        previewHeader:
          "border-white/10 bg-white/[0.03]",
        visual:
          "border-white/10 bg-white/[0.03]",
        icon:
          "bg-indigo-500/20 text-indigo-300",
        card:
          "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]",
        cta:
          "border-indigo-500/20 bg-indigo-500/10",
      };

    case "glass":
      return {
        page:
          "bg-slate-950 text-white",
        toolbar:
          "border-white/10 bg-white/10",
        background:
          "bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.35),transparent_30%),linear-gradient(135deg,#020617,#0f172a)]",
        text:
          "text-white",
        heading:
          "text-white",
        muted:
          "text-white/50",
        description:
          "text-white/65",
        accent:
          "text-cyan-300",
        badge:
          "border-white/20 bg-white/10 text-white/80 backdrop-blur-xl",
        selector:
          "text-white/60 hover:bg-white/10",
        selectorActive:
          "bg-white/20 text-white backdrop-blur-xl",
        primaryButton:
          "bg-white text-slate-950 hover:bg-white/90",
        secondaryButton:
          "border-white/20 bg-white/10 text-white hover:bg-white/20",
        preview:
          "border-white/20 bg-white/10 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl",
        previewHeader:
          "border-white/10 bg-white/5",
        visual:
          "border-white/10 bg-white/5 backdrop-blur-xl",
        icon:
          "bg-white/10 text-cyan-300 backdrop-blur-xl",
        card:
          "border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10",
        cta:
          "border-white/10 bg-white/10 backdrop-blur-xl",
      };

    case "modern":
    default:
      return {
        page:
          "bg-slate-50 text-slate-900",
        toolbar:
          "border-slate-200 bg-white/90",
        background:
          "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_40%)]",
        text:
          "text-slate-900",
        heading:
          "text-slate-950",
        muted:
          "text-slate-500",
        description:
          "text-slate-600",
        accent:
          "text-indigo-600",
        badge:
          "border-indigo-200 bg-indigo-50 text-indigo-700",
        selector:
          "text-slate-600 hover:bg-slate-100",
        selectorActive:
          "bg-indigo-600 text-white",
        primaryButton:
          "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500",
        secondaryButton:
          "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
        preview:
          "border-slate-200 bg-white shadow-xl shadow-slate-900/5",
        previewHeader:
          "border-slate-200 bg-slate-50",
        visual:
          "border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50",
        icon:
          "bg-indigo-600 text-white",
        card:
          "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg",
        cta:
          "border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50",
      };
  }
}