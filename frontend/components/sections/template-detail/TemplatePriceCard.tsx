"use client";

import Link from "next/link";

import {
  Check,
  ShieldCheck,
  ShoppingCart,
  CreditCard,
  ExternalLink,
  Crown,
  Download,
  RefreshCw,
  Headphones,
} from "lucide-react";

import AppButton from "@/components/common/AppButton";
import PriceTag from "@/components/common/PriceTag";

import { useCart } from "@/hooks/useCart";

import type { TemplateDetailProps } from "./types";
import type { Template } from "@/types/template/template";

import type {
  MarketplaceTemplate,
} from "@/components/sections/marketplace/types";

// =========================================================
// VARIANT
// =========================================================

export type TemplatePriceCardVariant =
  | "modern"
  | "minimal"
  | "dark"
  | "glass";

// =========================================================
// STYLES
// =========================================================

const variantStyles: Record<
  TemplatePriceCardVariant,
  {
    card: string;
    topGlow: string;
    priceArea: string;
    priceLabel: string;
    text: string;
    muted: string;
    divider: string;
    benefitIcon: string;
    benefitText: string;
    primaryButton: string;
    secondaryButton: string;
    demoButton: string;
    cartSummary: string;
    success: string;
    summaryText: string;
    security: string;
    securityIcon: string;
    premium: string;
    badge: string;
  }
> = {
  // =========================================================
  // MODERN
  // =========================================================

  modern: {
    card:
      "border-slate-200 bg-white shadow-xl shadow-slate-900/5",

    topGlow:
      "bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500",

    priceArea:
      "border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50",

    priceLabel:
      "text-slate-500",

    text:
      "text-slate-900",

    muted:
      "text-slate-500",

    divider:
      "border-slate-200",

    benefitIcon:
      "bg-emerald-50 text-emerald-600",

    benefitText:
      "text-slate-700",

    primaryButton:
      "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500",

    secondaryButton:
      "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600",

    demoButton:
      "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",

    cartSummary:
      "border-emerald-200 bg-emerald-50/70",

    success:
      "text-emerald-600",

    summaryText:
      "text-slate-600",

    security:
      "border-slate-200 bg-slate-50",

    securityIcon:
      "text-emerald-600",

    premium:
      "border-amber-200 bg-amber-50",

    badge:
      "text-amber-700",
  },

  // =========================================================
  // MINIMAL
  // =========================================================

  minimal: {
    card:
      "border-stone-200 bg-stone-50 shadow-sm",

    topGlow:
      "bg-stone-900",

    priceArea:
      "border-stone-200 bg-white",

    priceLabel:
      "text-stone-500",

    text:
      "text-stone-900",

    muted:
      "text-stone-500",

    divider:
      "border-stone-200",

    benefitIcon:
      "bg-stone-100 text-stone-700",

    benefitText:
      "text-stone-700",

    primaryButton:
      "bg-stone-900 text-white hover:bg-stone-800",

    secondaryButton:
      "border-stone-200 bg-white text-stone-800 hover:bg-stone-100",

    demoButton:
      "border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-200",

    cartSummary:
      "border-stone-200 bg-white",

    success:
      "text-emerald-600",

    summaryText:
      "text-stone-600",

    security:
      "border-stone-200 bg-white",

    securityIcon:
      "text-emerald-600",

    premium:
      "border-stone-200 bg-stone-100",

    badge:
      "text-stone-700",
  },

  // =========================================================
  // DARK
  // =========================================================

  dark: {
    card:
      "border-white/10 bg-[#0d0f14] text-white shadow-2xl shadow-black/30",

    topGlow:
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400",

    priceArea:
      "border-white/10 bg-white/[0.04]",

    priceLabel:
      "text-white/50",

    text:
      "text-white",

    muted:
      "text-white/50",

    divider:
      "border-white/10",

    benefitIcon:
      "bg-emerald-400/10 text-emerald-400",

    benefitText:
      "text-white/80",

    primaryButton:
      "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400",

    secondaryButton:
      "border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]",

    demoButton:
      "border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]",

    cartSummary:
      "border-emerald-400/20 bg-emerald-400/10",

    success:
      "text-emerald-400",

    summaryText:
      "text-white/60",

    security:
      "border-white/10 bg-white/[0.03]",

    securityIcon:
      "text-emerald-400",

    premium:
      "border-amber-400/20 bg-amber-400/10",

    badge:
      "text-amber-300",
  },

  // =========================================================
  // GLASS
  // =========================================================

  glass: {
    card:
      "border-white/20 bg-white/10 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl",

    topGlow:
      "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500",

    priceArea:
      "border-white/20 bg-white/10 backdrop-blur-xl",

    priceLabel:
      "text-slate-600",

    text:
      "text-slate-900",

    muted:
      "text-slate-600",

    divider:
      "border-white/20",

    benefitIcon:
      "bg-white/30 text-cyan-700",

    benefitText:
      "text-slate-700",

    primaryButton:
      "bg-slate-900 text-white hover:bg-slate-800",

    secondaryButton:
      "border-white/30 bg-white/20 text-slate-800 hover:bg-white/30",

    demoButton:
      "border-white/30 bg-white/20 text-slate-800 hover:bg-white/30",

    cartSummary:
      "border-emerald-300/40 bg-emerald-100/40",

    success:
      "text-emerald-700",

    summaryText:
      "text-slate-600",

    security:
      "border-white/20 bg-white/20",

    securityIcon:
      "text-emerald-600",

    premium:
      "border-amber-300/40 bg-amber-100/30",

    badge:
      "text-amber-700",
  },
};

// =========================================================
// Template -> MarketplaceTemplate
// =========================================================

function toMarketplaceTemplate(
  template: Template,
): MarketplaceTemplate {
  return {
    id: template.id,
    slug: template.slug,
    title: template.title,
    description: template.description,
    thumbnail: template.thumbnail,

    images: template.images ?? [],

    category: template.category,
    tags: template.tags ?? [],

    authorId: template.authorId,

    author: {
      name:
        template.author?.name ??
        "Unknown Author",

      avatar:
        template.author?.avatar ??
        "/avatars/default.png",

      verified:
        template.author?.verified ??
        false,
    },

    rating:
      template.rating ?? 0,

    reviews:
      template.reviews ?? 0,

    downloads:
      template.downloads ?? 0,

    price:
      template.price,

    // Quan trọng:
    // discountPrice phải lấy từ discountPrice
    // chứ không phải originalPrice.
    discountPrice:
      template.discountPrice ??
      undefined,

    originalPrice:
      template.originalPrice ??
      undefined,

    featured:
      template.featured ?? false,

    newest:
      template.newest ?? false,

    stock:
      template.stock ??
      undefined,

    license:
      template.license ??
      undefined,
  };
}

// =========================================================
// COMPONENT
// =========================================================

export default function TemplatePriceCard({
  template,
  variant = "modern",
}: TemplateDetailProps & {
  variant?: TemplatePriceCardVariant;
}) {
  const {
    add,
    isInCart,
    itemCount,
    subtotal,
  } = useCart();

  const styles = variantStyles[variant];

  const added =
    isInCart(template.id);

  const marketplaceTemplate =
    toMarketplaceTemplate(template);

  const hasDiscount =
    template.discountPrice != null &&
    template.originalPrice != null &&
    template.discountPrice <
      template.originalPrice;

  return (
    <aside
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        p-6
        transition-all
        duration-500
        ${styles.card}
      `}
      data-preview-variant={variant}
    >
      {/* =====================================================
          TOP ACCENT
         ===================================================== */}

      <div
        className={`
          absolute
          inset-x-0
          top-0
          h-1
          ${styles.topGlow}
        `}
      />

     <div className="pt-2">
  {/* ===================================================
      PREMIUM BADGE
     =================================================== */}

  {template.isPremium && (
    <div
      className={`
        mb-5
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-semibold
        ${styles.premium}
        ${styles.badge}
      `}
    >
      <Crown className="h-3.5 w-3.5" />

      Premium Template
    </div>
  )}

  {/* ===================================================
      PRICE
     =================================================== */}

  <div
    className={`
      mb-6
      rounded-2xl
      border
      p-5
      ${styles.priceArea}
    `}
  >
    <p
      className={`
        text-xs
        font-semibold
        uppercase
        tracking-wider
        ${styles.priceLabel}
      `}
    >
      Template Price
    </p>

    <div className="mt-3 flex flex-wrap items-end gap-3">
      <PriceTag
        price={template.price}
        discountPrice={
          template.discountPrice ??
          undefined
        }
      />

      {hasDiscount && (
        <span
          className={`
            pb-1
            text-sm
            line-through
            ${styles.muted}
          `}
        >
          ${template.originalPrice}
        </span>
      )}
    </div>

    {hasDiscount && (
      <div
        className={`
          mt-3
          inline-flex
          rounded-full
          bg-emerald-500/10
          px-2.5
          py-1
          text-xs
          font-semibold
          text-emerald-600
        `}
      >
        Save{" "}
        {Math.round(
          (1 -
            template.discountPrice! /
              template.originalPrice!) *
            100,
        )}
        %
      </div>
    )}
  </div>

  {/* ===================================================
      BENEFITS
     =================================================== */}

  <div className="mb-6">
    <p
      className={`
        mb-4
        text-xs
        font-semibold
        uppercase
        tracking-wider
        ${styles.muted}
      `}
    >
      What's included
    </p>

    <div>
      <Benefit
        icon={
          <RefreshCw className="h-4 w-4" />
        }
        text="Lifetime updates"
        styles={styles}
      />

      <Benefit
        icon={
          <Headphones className="h-4 w-4" />
        }
        text="Premium support"
        styles={styles}
      />

      <Benefit
        icon={
          <Download className="h-4 w-4" />
        }
        text="Instant download"
        styles={styles}
      />

      <Benefit
        icon={
          <ShieldCheck className="h-4 w-4" />
        }
        text={
          template.license ??
          "Standard License"
        }
        styles={styles}
      />
    </div>
  </div>

  {/* ===================================================
      DIVIDER
     =================================================== */}

  <div
    className={`
      mb-6
      border-t
      ${styles.divider}
    `}
  />

  {/* ===================================================
      ACTIONS
     =================================================== */}

  <div>
    {/* Buy Now */}

    <AppButton
      className={`
        mb-3
        w-full
        min-h-12
        rounded-xl
        transition-all
        duration-300
        hover:scale-[1.02]
        active:scale-[0.98]
        ${styles.primaryButton}
      `}
    >
      <CreditCard className="mr-2 h-4 w-4" />

      Buy Now
    </AppButton>

    {/* Cart */}

    {added ? (
      <>
        <Link
          href="/cart"
          className="mb-3 block"
        >
          <AppButton
            className={`
              w-full
              min-h-12
              rounded-xl
              transition-all
              duration-300
              hover:scale-[1.02]
              active:scale-[0.98]
              ${styles.secondaryButton}
            `}
          >
            <Check className="mr-2 h-4 w-4" />

            View Cart
          </AppButton>
        </Link>

        {/* Cart summary */}

        <div
          className={`
            mb-3
            space-y-4
            rounded-2xl
            border
            p-4
            animate-in
            fade-in
            slide-in-from-top-2
            duration-300
            ${styles.cartSummary}
          `}
        >
          <div
            className={`
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              ${styles.success}
            `}
          >
            <Check className="h-4 w-4" />

            Added to your cart
          </div>

          <div className="space-y-2 text-sm">
            <div
              className={`
                flex
                justify-between
                ${styles.summaryText}
              `}
            >
              <span>Items</span>

              <span>{itemCount}</span>
            </div>

            <div
              className={`
                flex
                justify-between
                font-semibold
                ${styles.text}
              `}
            >
              <span>Subtotal</span>

              <span>${subtotal}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/cart">
              <AppButton
                variant="outline"
                className={`
                  w-full
                  ${styles.secondaryButton}
                `}
              >
                View Cart
              </AppButton>
            </Link>

            <Link href="/checkout">
              <AppButton
                className={`
                  w-full
                  ${styles.primaryButton}
                `}
              >
                Checkout
              </AppButton>
            </Link>
          </div>

          <Link
            href="/marketplace"
            className={`
              block
              text-center
              text-xs
              transition-colors
              hover:text-primary
              ${styles.muted}
            `}
          >
            Continue Shopping
          </Link>
        </div>
      </>
    ) : (
      <AppButton
        variant="outline"
        className={`
          mb-3
          w-full
          min-h-12
          rounded-xl
          transition-all
          duration-300
          hover:scale-[1.02]
          active:scale-[0.98]
          ${styles.secondaryButton}
        `}
        onClick={() =>
          add(marketplaceTemplate)
        }
      >
        <ShoppingCart className="mr-2 h-4 w-4" />

        Add to Cart
      </AppButton>
    )}

    {/* Live Demo */}

    {template.demoUrl && (
      <a
        href={template.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <AppButton
          variant="secondary"
          className={`
            w-full
            min-h-11
            rounded-xl
            transition-all
            duration-300
            hover:scale-[1.02]
            active:scale-[0.98]
            ${styles.demoButton}
          `}
        >
          <ExternalLink className="mr-2 h-4 w-4" />

          Live Demo
        </AppButton>
      </a>
    )}
  </div>

  {/* ===================================================
      SECURITY
     =================================================== */}

  <div
    className={`
      mt-6
      flex
      items-start
      gap-3
      rounded-xl
      border
      p-3.5
      ${styles.security}
    `}
  >
    <ShieldCheck
      className={`
        mt-0.5
        h-4
        w-4
        shrink-0
        ${styles.securityIcon}
      `}
    />

    <div>
      <p
        className={`
          text-xs
          font-semibold
          ${styles.text}
        `}
      >
        Secure purchase
      </p>

      <p
        className={`
          mt-0.5
          text-xs
          leading-5
          ${styles.muted}
        `}
      >
        Secure payment and instant
        access after purchase.
      </p>
    </div>
  </div>
</div>
    </aside>
  );
}

// =========================================================
// BENEFIT
// =========================================================

function Benefit({
  icon,
  text,
  styles,
}: {
  icon: React.ReactNode;
  text: string;
  styles: (typeof variantStyles)["modern"];
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          ${styles.benefitIcon}
        `}
      >
        {icon}
      </div>

      <span
        className={`
          text-sm
          ${styles.benefitText}
        `}
      >
        {text}
      </span>

      <Check
        className={`
          ml-auto
          h-4
          w-4
          ${styles.success}
        `}
      />
    </div>
  );
}