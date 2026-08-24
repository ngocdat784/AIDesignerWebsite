"use client";

import {
  Download,
  Star,
  Calendar,
  BadgeInfo,
  Eye,
  Heart,
} from "lucide-react";

import type { TemplateDetailProps } from "./types";

export type TemplateStatisticsVariant =
  | "modern"
  | "minimal"
  | "dark"
  | "glass";

interface TemplateStatisticsProps extends TemplateDetailProps {
  variant?: TemplateStatisticsVariant;
}

const variantStyles: Record<
  TemplateStatisticsVariant,
  {
    card: string;
    icon: string;
    label: string;
    value: string;
    secondary: string;
  }
> = {
  // =========================================================
  // MODERN
  // =========================================================

  modern: {
    card:
      "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg",

    icon:
      "bg-indigo-50 text-indigo-600",

    label:
      "text-xs font-medium uppercase tracking-wider text-slate-500",

    value:
      "text-lg font-semibold text-slate-900",

    secondary:
      "text-xs text-slate-500",
  },

  // =========================================================
  // MINIMAL
  // =========================================================

  minimal: {
    card:
      "border-stone-200 bg-white hover:border-stone-300",

    icon:
      "bg-stone-100 text-stone-700",

    label:
      "text-xs font-medium uppercase tracking-wider text-stone-500",

    value:
      "text-lg font-medium text-stone-900",

    secondary:
      "text-xs text-stone-500",
  },

  // =========================================================
  // DARK
  // =========================================================

  dark: {
    card:
      "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",

    icon:
      "bg-indigo-500/10 text-indigo-300",

    label:
      "text-xs font-medium uppercase tracking-wider text-zinc-500",

    value:
      "text-lg font-semibold text-white",

    secondary:
      "text-xs text-white/50",
  },

  // =========================================================
  // GLASS
  // =========================================================

  glass: {
    card:
      "border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10",

    icon:
      "bg-white/10 text-cyan-300 backdrop-blur-xl",

    label:
      "text-xs font-medium uppercase tracking-wider text-white/50",

    value:
      "text-lg font-semibold text-white",

    secondary:
      "text-xs text-white/50",
  },
};

export default function TemplateStatistics({
  template,
  variant = "modern",
}: TemplateStatisticsProps) {
  const styles = variantStyles[variant];

  const rating = template.rating ?? 0;
  const reviews = template.reviews ?? 0;
  const downloads = template.downloads ?? 0;
  const views = template.views ?? 0;
  const favorites = template.favorites ?? 0;

  return (
    <section
      data-preview-variant={variant}
      className="transition-all duration-500"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* =====================================================
            RATING
           ===================================================== */}

        <StatisticsCard
          icon={
            <Star className="h-5 w-5 fill-current" />
          }
          label="Rating"
          value={
            rating > 0
              ? `${rating.toFixed(1)} / 5`
              : "No rating"
          }
          secondary={
            reviews > 0
              ? `${formatNumber(reviews)} reviews`
              : undefined
          }
          styles={styles}
        />

        {/* =====================================================
            DOWNLOADS
           ===================================================== */}

        <StatisticsCard
          icon={
            <Download className="h-5 w-5" />
          }
          label="Downloads"
          value={formatNumber(downloads)}
          styles={styles}
        />

        {/* =====================================================
            VIEWS
           ===================================================== */}

        <StatisticsCard
          icon={
            <Eye className="h-5 w-5" />
          }
          label="Views"
          value={formatNumber(views)}
          styles={styles}
        />

        {/* =====================================================
            FAVORITES
           ===================================================== */}

        <StatisticsCard
          icon={
            <Heart className="h-5 w-5" />
          }
          label="Favorites"
          value={formatNumber(favorites)}
          styles={styles}
        />

        {/* =====================================================
            UPDATED
           ===================================================== */}

        <StatisticsCard
          icon={
            <Calendar className="h-5 w-5" />
          }
          label="Last Updated"
          value={formatDate(template.updatedAt)}
          styles={styles}
        />

        {/* =====================================================
            LICENSE
           ===================================================== */}

        <StatisticsCard
          icon={
            <BadgeInfo className="h-5 w-5" />
          }
          label="License"
          value={template.license ?? "Standard"}
          styles={styles}
        />
      </div>
    </section>
  );
}

/* =========================================================
   STATISTICS CARD
========================================================= */

function StatisticsCard({
  icon,
  label,
  value,
  secondary,
  styles,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  secondary?: string;
  styles: {
    card: string;
    icon: string;
    label: string;
    value: string;
    secondary: string;
  };
}) {
  return (
    <div
      className={`
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        p-5
        transition-all
        duration-300
        ${styles.card}
      `}
    >
      {/* Icon */}

      <div
        className={`
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          transition-transform
          duration-300
          group-hover:scale-105
          ${styles.icon}
        `}
      >
        {icon}
      </div>

      {/* Content */}

      <div className="min-w-0">
        <p className={styles.label}>
          {label}
        </p>

        <p
          style={{
            marginTop: "4px",
          }}
          className={`
            truncate
            ${styles.value}
          `}
        >
          {value}
        </p>

        {secondary && (
          <p
            style={{
              marginTop: "4px",
            }}
            className={styles.secondary}
          >
            {secondary}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Unknown";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}