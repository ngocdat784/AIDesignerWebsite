"use client";

import {
  Clock3,
  Crown,
  ShieldCheck,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Rating from "@/components/common/Rating";

import type { TemplateDetailProps } from "./types";

export type TemplateHeaderVariant =
  | "modern"
  | "minimal"
  | "dark"
  | "glass";

interface TemplateHeaderProps extends TemplateDetailProps {
  variant?: TemplateHeaderVariant;
}

const variantStyles: Record<
  TemplateHeaderVariant,
  {
    section: string;
    title: string;
    description: string;
    badges: string;
    categoryBadge: string;
    premiumBadge: string;
    featuredBadge: string;
    newBadge: string;
    tagBadge: string;
    meta: string;
    author: string;
    authorName: string;
    verified: string;
    rating: string;
  }
> = {
  // =========================================================
  // MODERN
  // =========================================================

  modern: {
    section:
      "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 sm:p-8",

    title:
      "text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl",

    description:
      "mx-auto max-w-3xl text-base leading-8 text-slate-600 sm:text-lg",

    badges:
      "flex flex-wrap items-center justify-center gap-2",

    categoryBadge:
      "border-indigo-200 bg-indigo-50 text-indigo-700",

    premiumBadge:
      "border-amber-200 bg-amber-50 text-amber-700",

    featuredBadge:
      "border-purple-200 bg-purple-50 text-purple-700",

    newBadge:
      "border-blue-200 bg-blue-50 text-blue-700",

    tagBadge:
      "border-slate-200 bg-white text-slate-600",

    meta:
      "flex flex-wrap items-center justify-center gap-5",

    author:
      "text-sm text-slate-500",

    authorName:
      "font-semibold text-slate-900",

    verified:
      "text-blue-600",

    rating:
      "text-slate-900",
  },

  // =========================================================
  // MINIMAL
  // =========================================================

  minimal: {
    section:
      "rounded-3xl bg-transparent px-2 py-6 transition-all duration-500 sm:py-8",

    title:
      "mx-auto max-w-4xl text-4xl font-medium tracking-[-0.03em] text-stone-950 sm:text-5xl lg:text-6xl",

    description:
      "mx-auto max-w-2xl text-base leading-8 text-stone-500 sm:text-lg",

    badges:
      "flex flex-wrap items-center justify-center gap-2",

    categoryBadge:
      "border-stone-200 bg-stone-50 text-stone-700",

    premiumBadge:
      "border-amber-200 bg-amber-50 text-amber-700",

    featuredBadge:
      "border-purple-200 bg-purple-50 text-purple-700",

    newBadge:
      "border-blue-200 bg-blue-50 text-blue-700",

    tagBadge:
      "border-stone-200 bg-stone-50 text-stone-600",

    meta:
      "flex flex-wrap items-center justify-center gap-5",

    author:
      "text-sm text-stone-500",

    authorName:
      "font-medium text-stone-900",

    verified:
      "text-blue-600",

    rating:
      "text-stone-900",
  },

  // =========================================================
  // DARK
  // =========================================================

  dark: {
    section:
      "rounded-3xl border border-white/10 bg-[#08080c] p-6 text-white shadow-2xl shadow-black/30 transition-all duration-500 sm:p-8",

    title:
      "text-4xl font-bold tracking-tight text-white sm:text-5xl",

    description:
      "mx-auto max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg",

    badges:
      "flex flex-wrap items-center justify-center gap-2",

    categoryBadge:
      "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",

    premiumBadge:
      "border-amber-400/20 bg-amber-400/10 text-amber-300",

    featuredBadge:
      "border-purple-400/20 bg-purple-400/10 text-purple-300",

    newBadge:
      "border-blue-400/20 bg-blue-400/10 text-blue-300",

    tagBadge:
      "border-white/10 bg-white/5 text-white/70",

    meta:
      "flex flex-wrap items-center justify-center gap-5",

    author:
      "text-sm text-zinc-500",

    authorName:
      "font-semibold text-white",

    verified:
      "text-blue-400",

    rating:
      "text-white",
  },

  // =========================================================
  // GLASS
  // =========================================================

  glass: {
    section:
      "rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl shadow-cyan-500/10 backdrop-blur-xl transition-all duration-500 sm:p-8",

    title:
      "text-4xl font-bold tracking-tight text-white sm:text-5xl",

    description:
      "mx-auto max-w-3xl text-base leading-8 text-white/65 sm:text-lg",

    badges:
      "flex flex-wrap items-center justify-center gap-2",

    categoryBadge:
      "border-white/20 bg-white/10 text-white/80 backdrop-blur-xl",

    premiumBadge:
      "border-amber-300/30 bg-amber-300/10 text-amber-200 backdrop-blur-xl",

    featuredBadge:
      "border-purple-300/30 bg-purple-300/10 text-purple-200 backdrop-blur-xl",

    newBadge:
      "border-blue-300/30 bg-blue-300/10 text-blue-200 backdrop-blur-xl",

    tagBadge:
      "border-white/20 bg-white/10 text-white/70 backdrop-blur-xl",

    meta:
      "flex flex-wrap items-center justify-center gap-5",

    author:
      "text-sm text-white/60",

    authorName:
      "font-semibold text-white",

    verified:
      "text-blue-300",

    rating:
      "text-white",
  },
};

export default function TemplateHeader({
  template,
  variant = "modern",
}: TemplateHeaderProps) {
  const styles = variantStyles[variant];

  return (
  <section
    className={`
      ${styles.section}
      text-center
    `}
    data-preview-variant={variant}
  >
    {/* =====================================================
        TITLE + DESCRIPTION
    ===================================================== */}

    <div
      style={{
        marginBottom: "26px",
        textAlign: "center",
      }}
    >
      <h1 className={styles.title}>
        {template.title}
      </h1>

      <p
        className={styles.description}
        style={{
          marginTop: "12px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {template.description}
      </p>
    </div>

    {/* =====================================================
        CATEGORY + STATUS + TAGS
    ===================================================== */}

    <div
      className={styles.badges}
      style={{
        marginBottom: "22px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "fit-content",
        maxWidth: "100%",
      }}
    >
      {template.category && (
        <Badge className={styles.categoryBadge}>
          {template.category}
        </Badge>
      )}

      {template.isPremium && (
        <Badge
          className={`
            inline-flex
            items-center
            gap-1.5
            ${styles.premiumBadge}
          `}
        >
          <Crown className="h-3.5 w-3.5" />
          Premium
        </Badge>
      )}

      {template.featured && (
        <Badge
          className={`
            inline-flex
            items-center
            gap-1.5
            ${styles.featuredBadge}
          `}
        >
          <Star className="h-3.5 w-3.5" />
          Featured
        </Badge>
      )}

      {template.newest && (
        <Badge
          className={`
            inline-flex
            items-center
            gap-1.5
            ${styles.newBadge}
          `}
        >
          <Clock3 className="h-3.5 w-3.5" />
          New
        </Badge>
      )}

      {(template.tags ?? []).map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className={styles.tagBadge}
        >
          {tag}
        </Badge>
      ))}
    </div>

    {/* =====================================================
        RATING + AUTHOR
    ===================================================== */}

    <div
      className={styles.meta}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "fit-content",
        maxWidth: "100%",
      }}
    >
      <Rating
        value={template.rating ?? 0}
        reviewCount={
          template.reviews ??
          template.reviewCount ??
          0
        }
      />

      <span className={styles.author}>
        by{" "}
        <strong className={styles.authorName}>
          {template.author?.name ??
            "Unknown Author"}
        </strong>
      </span>

      {template.author?.verified && (
        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            text-xs
            font-medium
            ${styles.verified}
          `}
        >
          <ShieldCheck className="h-4 w-4" />
          Verified Author
        </span>
      )}
    </div>
  </section>
);
}