"use client";

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
  }
> = {
  modern: {
    section:
      "space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",

    title:
      "text-xl font-semibold text-slate-900",

    grid:
      "grid gap-3",
  },

  minimal: {
    section:
      "space-y-5 bg-transparent",

    title:
      "text-xl font-medium tracking-tight text-stone-900",

    grid:
      "grid gap-2",
  },

  dark: {
    section:
      "space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-xl",

    title:
      "text-xl font-semibold text-white",

    grid:
      "grid gap-3",
  },

  glass: {
    section:
      "space-y-4 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl",

    title:
      "text-xl font-semibold text-white",

    grid:
      "grid gap-3",
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