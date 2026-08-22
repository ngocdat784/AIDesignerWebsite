"use client";

import Link from "next/link";

import type { Template } from "@/types/template/template";
import type { TemplatePreviewStyle } from "./preview/types";

import WishlistButton from "./actions/WishlistButton";
import ShareButton from "./actions/ShareButton";
import CopyLinkButton from "./actions/CopyLinkButton";
import CompareButton from "./actions/CompareButton";
import SaveLaterButton from "./actions/SaveLaterButton";
import ReportButton from "./actions/ReportButton";

interface TemplateActionsProps {
  template: Template;
  variant?: TemplatePreviewStyle;
}

const variantStyles: Record<
  TemplatePreviewStyle,
  {
    section: string;
    title: string;
    grid: string;
    demoButton: string;
  }
> = {
  modern: {
    section:
      "space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",

    title:
      "text-xl font-semibold text-slate-900",

    grid:
      "grid gap-3",

    demoButton:
      "flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/20",
  },

  minimal: {
    section:
      "space-y-5 bg-transparent",

    title:
      "text-xl font-medium tracking-tight text-stone-900",

    grid:
      "grid gap-2",

    demoButton:
      "flex w-full items-center justify-center rounded-lg bg-stone-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800",
  },

  dark: {
    section:
      "space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-xl",

    title:
      "text-xl font-semibold text-white",

    grid:
      "grid gap-3",

    demoButton:
      "flex w-full items-center justify-center rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20",
  },

  glass: {
    section:
      "space-y-4 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl",

    title:
      "text-xl font-semibold text-white",

    grid:
      "grid gap-3",

    demoButton:
      "flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-200 hover:bg-white/30",
  },
};

export default function TemplateActions({
  template,
  variant = "modern",
}: TemplateActionsProps) {
  const styles = variantStyles[variant];

  return (
    <section
      className={styles.section}
      data-preview-variant={variant}
    >
      <h2 className={styles.title}>
        Actions
      </h2>

      <div className={styles.grid}>
        {/* Live Demo */}
        <Link
          href={`/demo/${template.slug}`}
          className={styles.demoButton}
        >
          Live Demo
        </Link>

        {/* Existing actions */}
        <WishlistButton />
        <ShareButton />
        <CopyLinkButton />
        <CompareButton />
        <SaveLaterButton />
        <ReportButton />
      </div>
    </section>
  );
}