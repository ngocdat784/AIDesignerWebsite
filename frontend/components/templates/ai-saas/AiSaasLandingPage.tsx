"use client";

import type { ComponentType } from "react";

// =========================================================
// STYLE INDEXES
// =========================================================

import * as ModernStyle from "./styles/modern";

// Khi tạo xong các style khác, chỉ cần mở comment:
//
// import * as MinimalStyle from "./styles/minimal";
// import * as DarkStyle from "./styles/dark";
// import * as GlassStyle from "./styles/glass";

// =========================================================
// STYLE ID
// =========================================================

export type AiSaasStyleId =
  | "modern"
  | "minimal"
  | "dark"
  | "glass";

// =========================================================
// COMPONENT SET
// =========================================================

export interface AiSaasComponentSet {
  Navbar: ComponentType<any>;
  Hero: ComponentType<any>;
  ProductPreview: ComponentType<any>;
  TrustedBy: ComponentType<any>;
  Features: ComponentType<any>;
  Workflow: ComponentType<any>;
  Technology: ComponentType<any>;
  Pricing: ComponentType<any>;
  Reviews: ComponentType<any>;
  CTA: ComponentType<any>;
  Footer: ComponentType<any>;
}

// =========================================================
// MODERN STYLE
// =========================================================

const modernStyle: AiSaasComponentSet = {
  Navbar: ModernStyle.Navbar,
  Hero: ModernStyle.Hero,
  ProductPreview: ModernStyle.ProductPreview,
  TrustedBy: ModernStyle.TrustedBy,
  Features: ModernStyle.Features,
  Workflow: ModernStyle.Workflow,
  Technology: ModernStyle.Technology,
  Pricing: ModernStyle.Pricing,
  Reviews: ModernStyle.Reviews,
  CTA: ModernStyle.CTA,
  Footer: ModernStyle.Footer,
};

// =========================================================
// STYLE REGISTRY
// =========================================================

const styleRegistry: Record<
  AiSaasStyleId,
  AiSaasComponentSet
> = {
  modern: modernStyle,

  // Hiện tại chưa có component riêng
  // nên tạm fallback về modern.
  minimal: modernStyle,
  dark: modernStyle,
  glass: modernStyle,
};

// =========================================================
// PROPS
// =========================================================

export interface AiSaasLandingPageProps {
  /**
   * Style được chọn từ Template Detail / Style Selector.
   *
   * Ví dụ:
   * "modern"
   * "minimal"
   * "dark"
   * "glass"
   */
  styleId?: AiSaasStyleId;

  /**
   * ClassName bên ngoài.
   */
  className?: string;
}

// =========================================================
// COMPONENT
// =========================================================

export default function AiSaasLandingPage({
  styleId = "modern",
  className = "",
}: AiSaasLandingPageProps) {
  // -------------------------------------------------------
  // Resolve style
  // -------------------------------------------------------

  const style =
    styleRegistry[styleId] ??
    styleRegistry.modern;

  // -------------------------------------------------------
  // Components
  // -------------------------------------------------------

  const {
    Navbar,
    Hero,
    ProductPreview,
    TrustedBy,
    Features,
    Workflow,
    Technology,
    Pricing,
    Reviews,
    CTA,
    Footer,
  } = style;

  // -------------------------------------------------------
  // Render
  // -------------------------------------------------------

  return (
    <main
      className={`
        min-h-screen
        bg-white
        text-slate-950
        ${className}
      `}
    >
      {/* =====================================================
          NAVBAR
         ===================================================== */}

      <Navbar />

      {/* =====================================================
          CONTENT
         ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-6
        "
      >
        {/* ===================================================
            HERO
           =================================================== */}

        <Hero />

        {/* ===================================================
            PRODUCT PREVIEW
           =================================================== */}

        <ProductPreview />

        {/* ===================================================
            TRUSTED BY
           =================================================== */}

        <TrustedBy />

        {/* ===================================================
            FEATURES
           =================================================== */}

        <Features />

        {/* ===================================================
            WORKFLOW
           =================================================== */}

        <Workflow />

        {/* ===================================================
            TECHNOLOGY
           =================================================== */}

        <Technology />

        {/* ===================================================
            PRICING
           =================================================== */}

        <Pricing />

        {/* ===================================================
            REVIEWS
           =================================================== */}

        <Reviews />

        {/* ===================================================
            CTA
           =================================================== */}

        <CTA />
      </div>

      {/* =====================================================
          FOOTER
         ===================================================== */}

      <Footer />
    </main>
  );
}