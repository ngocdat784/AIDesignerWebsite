"use client";

import { Badge } from "@/components/ui/badge";
import Rating from "@/components/common/Rating";

import type { TemplateDetailProps } from "./types";

export type TemplateHeaderVariant =
  | "modern"
  | "minimal"
  | "dark"
  | "glass";

interface TemplateHeaderProps
  extends TemplateDetailProps {
  variant?: TemplateHeaderVariant;
}

const variantStyles: Record<
  TemplateHeaderVariant,
  {
    section: string;
    title: string;
    description: string;
    badges: string;
    meta: string;
    author: string;
    authorName: string;
  }
> = {
  // =========================================================
  // MODERN
  // =========================================================

  modern: {
    section:
      "space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500",

    title:
      "text-4xl font-bold tracking-tight text-slate-900",

    description:
      "max-w-3xl text-lg leading-relaxed text-slate-500",

    badges:
      "flex flex-wrap gap-2",

    meta:
      "flex flex-wrap items-center gap-6",

    author:
      "text-slate-500",

    authorName:
      "font-semibold text-slate-900",
  },

  // =========================================================
  // MINIMAL
  // =========================================================

  minimal: {
    section:
      "space-y-8 bg-transparent px-2 py-6 transition-all duration-500",

    title:
      "max-w-4xl text-5xl font-medium tracking-[-0.03em] text-stone-900",

    description:
      "max-w-2xl text-lg leading-8 text-stone-500",

    badges:
      "flex flex-wrap gap-2",

    meta:
      "flex flex-wrap items-center gap-6",

    author:
      "text-sm text-stone-500",

    authorName:
      "font-medium text-stone-900",
  },

  // =========================================================
  // DARK
  // =========================================================

  dark: {
    section:
      "space-y-6 rounded-3xl border border-white/10 bg-[#08080c] p-8 text-white shadow-2xl transition-all duration-500",

    title:
      "text-4xl font-bold tracking-tight text-white",

    description:
      "max-w-3xl text-lg leading-relaxed text-white/60",

    badges:
      "flex flex-wrap gap-2",

    meta:
      "flex flex-wrap items-center gap-6",

    author:
      "text-white/50",

    authorName:
      "font-semibold text-white",
  },

  // =========================================================
  // GLASS
  // =========================================================

  glass: {
    section:
      "space-y-6 rounded-3xl border border-white/20 bg-white/10 p-8 text-white shadow-xl backdrop-blur-xl transition-all duration-500",

    title:
      "text-4xl font-bold tracking-tight text-white",

    description:
      "max-w-3xl text-lg leading-relaxed text-white/70",

    badges:
      "flex flex-wrap gap-2",

    meta:
      "flex flex-wrap items-center gap-6",

    author:
      "text-white/60",

    authorName:
      "font-semibold text-white",
  },
};

export default function TemplateHeader({
  template,
  variant = "modern",
}: TemplateHeaderProps) {
  const styles = variantStyles[variant];

  return (
    <section
      className={styles.section}
      data-preview-variant={variant}
    >
      {/* =====================================================
          TITLE + DESCRIPTION
         ===================================================== */}

      <div className="space-y-3">
        <h1 className={styles.title}>
          {template.title}
        </h1>

        <p className={styles.description}>
          {template.description}
        </p>
      </div>

      {/* =====================================================
          CATEGORY + TAGS
         ===================================================== */}

      <div className={styles.badges}>
        {template.category && (
          <Badge>
            {template.category}
          </Badge>
        )}

        {(template.tags ?? []).map((item) => (
          <Badge
            key={item}
            variant="secondary"
          >
            {item}
          </Badge>
        ))}
      </div>

      {/* =====================================================
          RATING + AUTHOR
         ===================================================== */}

      <div className={styles.meta}>
        <Rating
          value={template.rating ?? 0}
          reviewCount={template.reviews ?? 0}
        />

        <span className={styles.author}>
          by{" "}
          <strong className={styles.authorName}>
            {template.author?.name ??
              "Unknown Author"}
          </strong>
        </span>
      </div>
    </section>
  );
}