"use client";

import type { TemplateDetailProps } from "./types";

import Overview from "./description/Overview";
import Features from "./description/Features";
import Installation from "./description/Installation";
import Requirements from "./description/Requirements";
import Changelog from "./description/Changelog";

export type TemplateDescriptionVariant =
  | "modern"
  | "minimal"
  | "dark"
  | "glass";

interface TemplateDescriptionProps
  extends TemplateDetailProps {
  variant?: TemplateDescriptionVariant;
}

const variantStyles = {
  modern: {
    wrapper:
      "space-y-6",

    section:
      "rounded-2xl border border-border/60 bg-background p-6 shadow-sm transition-all duration-300",

    heading:
      "text-foreground",

    content:
      "text-muted-foreground",
  },

  minimal: {
    wrapper:
      "space-y-12",

    section:
      "border-b border-border/50 pb-10 transition-all duration-300",

    heading:
      "text-foreground",

    content:
      "text-muted-foreground",
  },

  dark: {
    wrapper:
      "space-y-6 rounded-3xl bg-[#07070a] p-6 text-white",

    section:
      "rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg shadow-black/20 transition-all duration-300",

    heading:
      "text-white",

    content:
      "text-white/60",
  },

  glass: {
    wrapper:
      "space-y-6 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl",

    section:
      "rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md transition-all duration-300",

    heading:
      "text-foreground",

    content:
      "text-muted-foreground",
  },
};

export default function TemplateDescription({
  template,
  variant = "modern",
}: TemplateDescriptionProps) {
  const styles = variantStyles[variant];

  return (
    <section
      className={styles.wrapper}
      data-preview-variant={variant}
    >
      {/* =====================================================
          Overview
         ===================================================== */}

      <div className={styles.section}>
        <Overview template={template} />
      </div>

      {/* =====================================================
          Features
         ===================================================== */}

      <div className={styles.section}>
        <Features />
      </div>

      {/* =====================================================
          Installation
         ===================================================== */}

      <div className={styles.section}>
        <Installation />
      </div>

      {/* =====================================================
          Requirements
         ===================================================== */}

      <div className={styles.section}>
        <Requirements />
      </div>

      {/* =====================================================
          Changelog
         ===================================================== */}

      <div className={styles.section}>
        <Changelog />
      </div>
    </section>
  );
}