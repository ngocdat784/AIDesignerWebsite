"use client";

import Link from "next/link";

import {
  ExternalLink,
  Heart,
  Share2,
  Link2,
  GitCompare,
  Bookmark,
  Flag,
  ArrowUpRight,
} from "lucide-react";

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
    accent: string;
    title: string;
    subtitle: string;
    grid: string;
    demoButton: string;
    action: string;
    actionIcon: string;
    actionText: string;
    divider: string;
    secondaryTitle: string;
  }
> = {
  // =========================================================
  // MODERN
  // =========================================================

  modern: {
    section:
      "relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 transition-all duration-500",

    accent:
      "bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500",

    title:
      "text-xl font-bold tracking-tight text-slate-900",

    subtitle:
      "text-sm leading-6 text-slate-500",

    grid:
      "grid gap-2.5",

    demoButton:
      "group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/25 active:translate-y-0",

    action:
      "group flex min-h-11 w-full items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/60",

    actionIcon:
      "text-slate-500 transition-colors group-hover:text-indigo-600",

    actionText:
      "text-slate-700 group-hover:text-indigo-700",

    divider:
      "border-slate-200",

    secondaryTitle:
      "text-xs font-semibold uppercase tracking-wider text-slate-400",
  },

  // =========================================================
  // MINIMAL
  // =========================================================

  minimal: {
    section:
      "relative space-y-6 bg-transparent px-1 py-4",

    accent:
      "bg-stone-900",

    title:
      "text-xl font-medium tracking-tight text-stone-900",

    subtitle:
      "text-sm leading-6 text-stone-500",

    grid:
      "grid gap-2",

    demoButton:
      "group flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-stone-800",

    action:
      "group flex min-h-10 w-full items-center rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm transition-all duration-200 hover:bg-stone-100",

    actionIcon:
      "text-stone-500 transition-colors group-hover:text-stone-900",

    actionText:
      "text-stone-700 group-hover:text-stone-900",

    divider:
      "border-stone-200",

    secondaryTitle:
      "text-xs font-medium uppercase tracking-wider text-stone-400",
  },

  // =========================================================
  // DARK
  // =========================================================

  dark: {
    section:
      "relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0f14] p-6 text-white shadow-2xl shadow-black/30",

    accent:
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400",

    title:
      "text-xl font-bold tracking-tight text-white",

    subtitle:
      "text-sm leading-6 text-white/50",

    grid:
      "grid gap-2.5",

    demoButton:
      "group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-400 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0",

    action:
      "group flex min-h-11 w-full items-center rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm transition-all duration-200 hover:border-indigo-400/30 hover:bg-white/[0.07]",

    actionIcon:
      "text-white/50 transition-colors group-hover:text-indigo-300",

    actionText:
      "text-white/75 group-hover:text-white",

    divider:
      "border-white/10",

    secondaryTitle:
      "text-xs font-semibold uppercase tracking-wider text-white/30",
  },

  // =========================================================
  // GLASS
  // =========================================================

  glass: {
    section:
      "relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl",

    accent:
      "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500",

    title:
      "text-xl font-bold tracking-tight text-slate-900",

    subtitle:
      "text-sm leading-6 text-slate-600",

    grid:
      "grid gap-2.5",

    demoButton:
      "group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0",

    action:
      "group flex min-h-11 w-full items-center rounded-xl border border-white/30 bg-white/20 px-3.5 py-2.5 text-sm backdrop-blur-xl transition-all duration-200 hover:bg-white/30",

    actionIcon:
      "text-slate-600 transition-colors group-hover:text-slate-900",

    actionText:
      "text-slate-700 group-hover:text-slate-900",

    divider:
      "border-white/20",

    secondaryTitle:
      "text-xs font-semibold uppercase tracking-wider text-slate-500",
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
      {/* ===================================================
          TOP ACCENT
         =================================================== */}

      <div
        className={`
          absolute
          inset-x-0
          top-0
          h-1
          ${styles.accent}
        `}
      />

      <div className="space-y-6 pt-1">

        {/* =================================================
            HEADER
           ================================================= */}

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <h2 className={styles.title}>
              Actions
            </h2>

            <ArrowUpRight
              className={`
                h-4
                w-4
                ${styles.subtitle}
              `}
            />
          </div>

          <p className={styles.subtitle}>
            Preview, save, share or manage this
            template.
          </p>
        </div>

        {/* =================================================
            PRIMARY ACTION
           ================================================= */}

        <Link
          href={`/demo/${template.slug}`}
          className={styles.demoButton}
        >
          <ExternalLink
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />

          Live Demo

          <ArrowUpRight
            className="
              h-4
              w-4
              opacity-60
              transition-transform
              duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </Link>

        {/* =================================================
            QUICK ACTIONS
           ================================================= */}

        <div
          className={`
            border-t
            pt-5
            ${styles.divider}
          `}
        >
          <p className={styles.secondaryTitle}>
            Quick Actions
          </p>

          <div
            className={`
              mt-3
              ${styles.grid}
            `}
          >
            <ActionWrapper
              icon={
                <Heart className="h-4 w-4" />
              }
              text="Add to Wishlist"
              styles={styles}
            >
              <WishlistButton />
            </ActionWrapper>

            <ActionWrapper
              icon={
                <Share2 className="h-4 w-4" />
              }
              text="Share Template"
              styles={styles}
            >
              <ShareButton />
            </ActionWrapper>

            <ActionWrapper
              icon={
                <Link2 className="h-4 w-4" />
              }
              text="Copy Link"
              styles={styles}
            >
              <CopyLinkButton />
            </ActionWrapper>

            <ActionWrapper
              icon={
                <GitCompare className="h-4 w-4" />
              }
              text="Compare"
              styles={styles}
            >
              <CompareButton />
            </ActionWrapper>

            <ActionWrapper
              icon={
                <Bookmark className="h-4 w-4" />
              }
              text="Save for Later"
              styles={styles}
            >
              <SaveLaterButton />
            </ActionWrapper>
          </div>
        </div>

        {/* =================================================
            REPORT
           ================================================= */}

        <div
          className={`
            border-t
            pt-4
            ${styles.divider}
          `}
        >
          <ActionWrapper
            icon={
              <Flag className="h-4 w-4" />
            }
            text="Report Template"
            styles={styles}
          >
            <ReportButton />
          </ActionWrapper>
        </div>

      </div>
    </section>
  );
}

// =========================================================
// ACTION WRAPPER
// =========================================================

function ActionWrapper({
  icon,
  text,
  styles,
  children,
}: {
  icon: React.ReactNode;
  text: string;
  styles: (typeof variantStyles)["modern"];
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Visual layer */}

      <div
        className={`
          pointer-events-none
          absolute
          inset-0
          flex
          items-center
          gap-3
          rounded-xl
          px-3.5
        `}
      >
        <span className={styles.actionIcon}>
          {icon}
        </span>

        <span className={styles.actionText}>
          {text}
        </span>
      </div>

      {/* Existing action component */}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}