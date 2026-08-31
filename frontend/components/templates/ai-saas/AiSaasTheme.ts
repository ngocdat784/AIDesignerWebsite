/**
 * AI SaaS Theme System
 *
 * Quản lý theme cho toàn bộ AI SaaS templates.
 *
 * Style được chọn độc lập với Template.
 *
 * Ví dụ:
 *
 * const theme = AiSaasThemes.modern;
 *
 * hoặc:
 *
 * const theme = getAiSaasTheme("dark");
 */

// =========================================================
// STYLE ID
// =========================================================

export type AiSaasStyleId =
  | "modern"
  | "minimal"
  | "dark"
  | "glass";

// =========================================================
// COMMON THEME
// =========================================================

const commonTheme = {
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    heroTitle:
      "text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.98]",

    sectionTitle:
      "text-4xl md:text-5xl font-black tracking-[-0.03em] leading-tight",

    cardTitle:
      "text-xl md:text-2xl font-bold tracking-[-0.02em]",

    body:
      "text-base md:text-lg leading-7",

    small:
      "text-sm leading-6",
  },

  layout: {
    maxWidth: "max-w-7xl",
    contentWidth: "max-w-6xl",
    narrowWidth: "max-w-4xl",

    pagePadding:
      "px-5 sm:px-6 lg:px-8",

    sectionPadding:
      "py-20 md:py-28 lg:py-32",

    sectionPaddingSmall:
      "py-14 md:py-20",

    centered:
      "mx-auto w-full",

    section:
      "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8",
  },

  spacing: {
    navbarToHero:
      "pt-20 md:pt-24",

    heroToPreview:
      "mt-16 md:mt-20",

    sectionGap:
      "mt-20 md:mt-28",

    cardGap:
      "gap-6 md:gap-8",

    contentGap:
      "gap-8 md:gap-12",
  },

  radius: {
    button:
      "rounded-xl",

    card:
      "rounded-2xl",

    largeCard:
      "rounded-3xl",

    preview:
      "rounded-[2rem]",

    pill:
      "rounded-full",
  },

  buttons: {
    primary: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5",
    },

    secondary: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5",
    },

    ctaWhite: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-0.5",
    },

    text: {
      className:
        "inline-flex items-center gap-2 text-sm font-bold transition-colors",
    },
  },

  icon: {
    wrapper:
      "flex h-12 w-12 items-center justify-center rounded-xl",

    wrapperGradient:
      "flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg",
  },

  trustedBy: {
    label:
      "text-center text-xs font-bold uppercase tracking-[0.2em]",

    row:
      "mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-60 grayscale",
  },

  cards: {
    base:
      "rounded-2xl border p-6 transition-all duration-300",

    hover:
      "hover:-translate-y-1",

    soft:
      "rounded-2xl border p-6",

    dark:
      "rounded-2xl border p-6",

    pricing:
      "rounded-3xl border p-7",

    pricingFeatured:
      "rounded-3xl border p-7",
  },
} as const;

// =========================================================
// MODERN
// =========================================================

export const modernTheme = {
  ...commonTheme,

  id: "modern" as const,

  colors: {
    background: "#ffffff",
    backgroundSoft: "#f8faff",
    backgroundLavender: "#f5f3ff",

    text: "#0f172a",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
    textWhite: "#ffffff",

    border: "#e2e8f0",
    borderSoft: "#eef2ff",

    primary: "#4f46e5",
    primaryDark: "#4338ca",
    secondary: "#6366f1",
    violet: "#7c3aed",
    purple: "#9333ea",

    previewBackground: "#020617",
    previewSurface: "#0f172a",
    previewSurfaceSoft: "#111827",
    previewBorder: "#1e293b",

    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
  },

  gradients: {
    primary:
      "linear-gradient(90deg, #4f46e5 0%, #6366f1 45%, #9333ea 100%)",

    text:
      "linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%)",

    heroGlow:
      "radial-gradient(circle at center, rgba(99, 102, 241, 0.16) 0%, rgba(124, 58, 237, 0.08) 35%, transparent 70%)",

    sectionGlow:
      "radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, transparent 65%)",

    darkPreview:
      "linear-gradient(135deg, #020617 0%, #0f172a 55%, #1e1b4b 100%)",

    darkCard:
      "linear-gradient(135deg, #0f172a 0%, #111827 60%, #1e1b4b 100%)",

    purplePanel:
      "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
  },

  buttons: {
    ...commonTheme.buttons,

    primary: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30",

      style: {
        background:
          "linear-gradient(90deg, #4f46e5 0%, #6366f1 45%, #9333ea 100%)",
      },
    },

    secondary: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md",
    },

    ctaWhite: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-indigo-600 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50",
    },

    text: {
      className:
        "inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition-colors hover:text-purple-600",
    },
  },

  navbar: {
    wrapper:
      "w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl",

    inner:
      "mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8",

    logo:
      "text-xl font-black tracking-[-0.03em] text-slate-950",

    subtitle:
      "text-xs font-medium text-slate-500",

    link:
      "text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-600",

    activeLink:
      "text-sm font-semibold text-indigo-600",
  },

  hero: {
    section:
      "relative overflow-hidden bg-white",

    content:
      "relative z-10 mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 md:py-24 lg:py-28",

    badge:
      "inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-4 py-2 text-sm font-bold text-indigo-600",

    title:
      "mx-auto mt-7 max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-6xl md:text-7xl",

    gradientTitle:
      "bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 bg-clip-text text-transparent",

    description:
      "mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg md:text-xl",

    actions:
      "mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row",

    stats:
      "mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-14",

    statValue:
      "text-3xl font-black tracking-[-0.03em] text-slate-950",

    statLabel:
      "mt-1 text-xs font-bold uppercase tracking-[0.18em] text-indigo-500",
  },

  preview: {
    section:
      "relative bg-white px-5 py-16 sm:px-6 md:py-20 lg:px-8",

    heading:
      "text-center",

    eyebrow:
      "text-sm font-bold uppercase tracking-[0.18em] text-indigo-500",

    title:
      "mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl",

    description:
      "mx-auto mt-3 max-w-2xl text-base text-slate-500",

    window:
      "mx-auto mt-10 max-w-6xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-[0_35px_90px_-35px_rgba(15,23,42,0.65)]",

    topBar:
      "flex h-12 items-center gap-2 border-b border-slate-800 bg-slate-950 px-5",

    dot:
      "h-3 w-3 rounded-full",

    sidebar:
      "w-52 shrink-0 border-r border-slate-800 bg-slate-950",

    content:
      "min-w-0 flex-1 bg-slate-900",

    metricCard:
      "rounded-2xl border border-slate-800 bg-slate-900/80 p-5",

    metricValue:
      "mt-2 text-3xl font-black text-white",

    metricLabel:
      "text-sm text-slate-400",

    accentPanel:
      "rounded-2xl bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950",
  },

  sections: {
    wrapper:
      "mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8",

    heading:
      "mx-auto max-w-3xl text-center",

    eyebrow:
      "text-sm font-bold uppercase tracking-[0.18em] text-indigo-500",

    title:
      "mt-3 text-4xl font-black tracking-[-0.035em] text-slate-950 md:text-5xl",

    description:
      "mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg",
  },

  cta: {
    section:
      "relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-center text-white sm:px-10 md:py-20",

    glow:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.35),transparent_65%)]",

    title:
      "relative z-10 text-4xl font-black tracking-[-0.035em] md:text-5xl",

    description:
      "relative z-10 mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg",
  },

  footer: {
    wrapper:
      "border-t border-slate-200 bg-white",

    inner:
      "mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8",

    brand:
      "text-lg font-black tracking-[-0.03em] text-slate-950",

    text:
      "text-sm text-slate-500",

    link:
      "text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600",
  },

  shadows: {
    button:
      "shadow-lg shadow-indigo-500/20",

    card:
      "shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]",

    preview:
      "shadow-[0_35px_90px_-35px_rgba(15,23,42,0.55)]",

    glow:
      "shadow-[0_0_80px_rgba(99,102,241,0.16)]",
  },

  cards: {
    ...commonTheme.cards,

    base:
      "rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.22)] transition-all duration-300",

    hover:
      "hover:-translate-y-1 hover:border-indigo-100 hover:shadow-[0_25px_70px_-30px_rgba(79,70,229,0.22)]",

    soft:
      "rounded-2xl border border-indigo-100/80 bg-indigo-50/40 p-6",

    dark:
      "rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white",

    pricing:
      "rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.28)]",

    pricingFeatured:
      "rounded-3xl border border-indigo-400 bg-gradient-to-b from-indigo-50 to-white p-7 shadow-[0_30px_90px_-35px_rgba(79,70,229,0.35)]",
  },

  icon: {
    ...commonTheme.icon,

    wrapper:
      "flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600",

    wrapperGradient:
      "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20",
  },

  trustedBy: {
    ...commonTheme.trustedBy,

    label:
      "text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400",
  },
} as const;

// =========================================================
// MINIMAL
// =========================================================

export const minimalTheme = {
  ...modernTheme,

  id: "minimal" as const,

  colors: {
    ...modernTheme.colors,

    background: "#fafaf9",
    backgroundSoft: "#f5f5f4",
    backgroundLavender: "#fafaf9",

    text: "#1c1917",
    textSecondary: "#78716c",
    textMuted: "#a8a29e",

    border: "#e7e5e4",
    borderSoft: "#f5f5f4",

    primary: "#292524",
    primaryDark: "#1c1917",
    secondary: "#57534e",
    violet: "#78716c",
    purple: "#44403c",
  },

  gradients: {
    ...modernTheme.gradients,

    primary:
      "linear-gradient(90deg, #292524 0%, #57534e 100%)",

    text:
      "linear-gradient(90deg, #292524 0%, #57534e 100%)",

    heroGlow:
      "radial-gradient(circle at center, rgba(120,113,108,0.08), transparent 70%)",
  },

  buttons: {
    ...modernTheme.buttons,

    primary: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800",
    },

    secondary: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-7 py-3.5 text-sm font-bold text-stone-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-50",
    },

    text: {
      className:
        "inline-flex items-center gap-2 text-sm font-bold text-stone-700 transition-colors hover:text-stone-950",
    },
  },

  navbar: {
    wrapper:
      "w-full border-b border-stone-200 bg-stone-50/90 backdrop-blur-xl",

    inner:
      "mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8",

    logo:
      "text-xl font-black tracking-[-0.03em] text-stone-950",

    subtitle:
      "text-xs font-medium text-stone-500",

    link:
      "text-sm font-semibold text-stone-600 transition-colors hover:text-stone-950",

    activeLink:
      "text-sm font-semibold text-stone-950",
  },

  hero: {
    ...modernTheme.hero,

    section:
      "relative overflow-hidden bg-stone-50",

    title:
      "mx-auto mt-7 max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-stone-950 sm:text-6xl md:text-7xl",

    gradientTitle:
      "text-stone-900",

    description:
      "mx-auto mt-7 max-w-3xl text-base leading-7 text-stone-600 sm:text-lg md:text-xl",

    badge:
      "inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-stone-700",
  },

  sections: {
    ...modernTheme.sections,

    wrapper:
      "mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8",

    eyebrow:
      "text-sm font-bold uppercase tracking-[0.18em] text-stone-500",

    title:
      "mt-3 text-4xl font-black tracking-[-0.035em] text-stone-950 md:text-5xl",

    description:
      "mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600 md:text-lg",
  },

  cards: {
    ...modernTheme.cards,

    base:
      "rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300",

    hover:
      "hover:-translate-y-1 hover:border-stone-300 hover:shadow-md",

    soft:
      "rounded-2xl border border-stone-200 bg-stone-50 p-6",

    pricing:
      "rounded-3xl border border-stone-200 bg-white p-7 shadow-sm",

    pricingFeatured:
      "rounded-3xl border border-stone-900 bg-white p-7 shadow-md",
  },

  cta: {
    section:
      "relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-stone-900 px-6 py-16 text-center text-white sm:px-10 md:py-20",

    glow:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]",

    title:
      "relative z-10 text-4xl font-black tracking-[-0.035em] md:text-5xl",

    description:
      "relative z-10 mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-300 md:text-lg",
  },
} as const;

// =========================================================
// DARK
// =========================================================

export const darkTheme = {
  ...modernTheme,

  id: "dark" as const,

  colors: {
    ...modernTheme.colors,

    background: "#050816",
    backgroundSoft: "#0f172a",
    backgroundLavender: "#17133b",

    text: "#f8fafc",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    textWhite: "#ffffff",

    border: "#1e293b",
    borderSoft: "#312e81",

    primary: "#818cf8",
    primaryDark: "#6366f1",
    secondary: "#a78bfa",
    violet: "#8b5cf6",
    purple: "#c084fc",

    previewBackground: "#020617",
    previewSurface: "#0f172a",
    previewSurfaceSoft: "#111827",
    previewBorder: "#1e293b",
  },

  gradients: {
    ...modernTheme.gradients,

    primary:
      "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #c084fc 100%)",

    text:
      "linear-gradient(90deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%)",

    heroGlow:
      "radial-gradient(circle at center, rgba(99,102,241,0.22), rgba(124,58,237,0.10) 40%, transparent 72%)",

    sectionGlow:
      "radial-gradient(circle at center, rgba(99,102,241,0.12), transparent 70%)",

    darkPreview:
      "linear-gradient(135deg, #020617 0%, #111827 55%, #1e1b4b 100%)",
  },

  buttons: {
    ...modernTheme.buttons,

    primary: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-400",
    },

    secondary: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500",
    },
  },

  navbar: {
    wrapper:
      "w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl",

    inner:
      "mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8",

    logo:
      "text-xl font-black tracking-[-0.03em] text-white",

    subtitle:
      "text-xs font-medium text-slate-400",

    link:
      "text-sm font-semibold text-slate-400 transition-colors hover:text-indigo-400",

    activeLink:
      "text-sm font-semibold text-indigo-400",
  },

  hero: {
    ...modernTheme.hero,

    section:
      "relative overflow-hidden bg-slate-950 text-white",

    title:
      "mx-auto mt-7 max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl",

    gradientTitle:
      "bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent",

    description:
      "mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg md:text-xl",

    badge:
      "inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-300",
  },

  sections: {
    ...modernTheme.sections,

    wrapper:
      "mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8",

    eyebrow:
      "text-sm font-bold uppercase tracking-[0.18em] text-indigo-400",

    title:
      "mt-3 text-4xl font-black tracking-[-0.035em] text-white md:text-5xl",

    description:
      "mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg",
  },

  cards: {
    ...modernTheme.cards,

    base:
      "rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-white transition-all duration-300",

    hover:
      "hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10",

    soft:
      "rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-6",

    dark:
      "rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white",

    pricing:
      "rounded-3xl border border-slate-800 bg-slate-900 p-7 text-white",

    pricingFeatured:
      "rounded-3xl border border-indigo-500 bg-gradient-to-b from-indigo-950 to-slate-900 p-7 text-white",
  },

  cta: {
    section:
      "relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-center text-white sm:px-10 md:py-20",

    glow:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.35),transparent_65%)]",

    title:
      "relative z-10 text-4xl font-black tracking-[-0.035em] md:text-5xl",

    description:
      "relative z-10 mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg",
  },

  footer: {
    wrapper:
      "border-t border-slate-800 bg-slate-950",

    inner:
      "mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8",

    brand:
      "text-lg font-black tracking-[-0.03em] text-white",

    text:
      "text-sm text-slate-400",

    link:
      "text-sm font-semibold text-slate-400 transition-colors hover:text-indigo-400",
  },
} as const;

// =========================================================
// GLASS
// =========================================================

export const glassTheme = {
  ...modernTheme,

  id: "glass" as const,

  colors: {
    ...modernTheme.colors,

    background: "#f8fafc",
    backgroundSoft: "#f1f5f9",

    text: "#0f172a",
    textSecondary: "#475569",
    textMuted: "#94a3b8",

    border: "rgba(255,255,255,0.35)",
    borderSoft: "rgba(255,255,255,0.2)",

    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    secondary: "#3b82f6",
    violet: "#7c3aed",
    purple: "#9333ea",
  },

  gradients: {
    ...modernTheme.gradients,

    primary:
      "linear-gradient(90deg, #2563eb 0%, #6366f1 50%, #9333ea 100%)",

    text:
      "linear-gradient(90deg, #2563eb 0%, #7c3aed 50%, #9333ea 100%)",

    heroGlow:
      "radial-gradient(circle at center, rgba(59,130,246,0.18), rgba(147,51,234,0.10) 40%, transparent 72%)",
  },

  buttons: {
    ...modernTheme.buttons,

    primary: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800",
    },

    secondary: {
      className:
        "inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/30 px-7 py-3.5 text-sm font-bold text-slate-900 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/50",
    },
  },

  navbar: {
    wrapper:
      "w-full border-b border-white/30 bg-white/60 backdrop-blur-2xl",

    inner:
      "mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8",

    logo:
      "text-xl font-black tracking-[-0.03em] text-slate-950",

    subtitle:
      "text-xs font-medium text-slate-500",

    link:
      "text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-600",

    activeLink:
      "text-sm font-semibold text-indigo-600",
  },

  hero: {
    ...modernTheme.hero,

    section:
      "relative overflow-hidden bg-slate-50",

    title:
      "mx-auto mt-7 max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-6xl md:text-7xl",

    gradientTitle:
      "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent",

    description:
      "mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg md:text-xl",

    badge:
      "inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-bold text-indigo-600 backdrop-blur-xl",
  },

  cards: {
    ...modernTheme.cards,

    base:
      "rounded-2xl border border-white/40 bg-white/40 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-2xl transition-all duration-300",

    hover:
      "hover:-translate-y-1 hover:bg-white/55 hover:shadow-2xl",

    soft:
      "rounded-2xl border border-white/40 bg-white/30 p-6 backdrop-blur-xl",

    pricing:
      "rounded-3xl border border-white/40 bg-white/50 p-7 shadow-xl backdrop-blur-2xl",

    pricingFeatured:
      "rounded-3xl border border-indigo-300/50 bg-white/60 p-7 shadow-2xl shadow-indigo-500/10 backdrop-blur-2xl",
  },

  cta: {
    section:
      "relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-900/90 px-6 py-16 text-center text-white shadow-2xl backdrop-blur-xl sm:px-10 md:py-20",

    glow:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_65%)]",

    title:
      "relative z-10 text-4xl font-black tracking-[-0.035em] md:text-5xl",

    description:
      "relative z-10 mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg",
  },

  footer: {
    wrapper:
      "border-t border-white/30 bg-white/60 backdrop-blur-xl",

    inner:
      "mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8",

    brand:
      "text-lg font-black tracking-[-0.03em] text-slate-950",

    text:
      "text-sm text-slate-500",

    link:
      "text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600",
  },
} as const;

// =========================================================
// THEME REGISTRY
// =========================================================

export const AiSaasThemes = {
  modern: modernTheme,
  minimal: minimalTheme,
  dark: darkTheme,
  glass: glassTheme,
} as const;

// =========================================================
// DEFAULT THEME
// =========================================================

export const AiSaasTheme = modernTheme;

// =========================================================
// GET THEME
// =========================================================

export function getAiSaasTheme(
  styleId?: string | null,
) {
  if (
    styleId &&
    styleId in AiSaasThemes
  ) {
    return AiSaasThemes[
      styleId as AiSaasStyleId
    ];
  }

  return AiSaasThemes.modern;
}

// =========================================================
// TYPE
// =========================================================

export type AiSaasThemeType =
  typeof AiSaasTheme;