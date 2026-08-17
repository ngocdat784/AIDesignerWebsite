
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Check,
  Download,
  ShoppingCart,
} from "lucide-react";

import AppButton from "@/components/common/AppButton";
import PriceTag from "@/components/common/PriceTag";
import Rating from "@/components/common/Rating";

import { useCart } from "@/hooks/useCart";

import { MarketplaceTemplate } from "../types";

interface TemplateCardProps {
  template: MarketplaceTemplate;
}

export default function TemplateCard({
  template,
}: TemplateCardProps) {
  const { add, isInCart } = useCart();

  const added = isInCart(template.id);

  // =========================================================
  // Pricing
  // =========================================================

  const currentPrice =
    template.discountPrice ??
    template.price;

  const originalPrice =
    template.originalPrice ?? null;

  const hasDiscount =
    originalPrice !== null &&
    originalPrice > currentPrice;

  // =========================================================
  // Statistics
  // =========================================================

  const rating =
    template.rating ?? 0;

  const reviewCount =
    template.reviews ??
    template.reviewCount ??
    0;

  const downloads =
    template.downloads ?? 0;

  // =========================================================
  // Author
  // =========================================================

  const authorName =
    template.author?.name ??
    "Unknown Creator";

  const authorVerified =
    template.author?.verified ?? false;

  return (
    <article
      className="
        group
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-border/60
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-lg
      "
    >
      {/* ===================================================== */}
      {/* Thumbnail */}
      {/* ===================================================== */}

      <Link
        href={`/templates/${template.slug}`}
        className="
          block
          shrink-0
        "
      >
        <div
          className="
            relative
            aspect-[16/9]
            w-full
            overflow-hidden
            bg-muted
          "
        >
          <Image
            src={template.thumbnail}
            alt={template.title}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              (max-width: 1536px) 33vw,
              25vw
            "
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          {/* Custom badge */}

          {template.badge && (
            <div
              className="
                absolute
                left-3
                top-3
                rounded-full
                bg-primary
                px-3
                py-1
                text-xs
                font-semibold
                text-primary-foreground
                shadow-md
              "
            >
              {template.badge.text}
            </div>
          )}

          {/* Premium badge */}

          {template.isPremium &&
            !template.badge && (
              <div
                className="
                  absolute
                  left-3
                  top-3
                  rounded-full
                  bg-primary
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-primary-foreground
                  shadow-md
                "
              >
                Premium
              </div>
            )}

          {/* New badge */}

          {template.newest && (
            <div
              className="
                absolute
                right-3
                top-3
                rounded-full
                bg-background/90
                px-3
                py-1
                text-xs
                font-semibold
                text-foreground
                shadow-md
                backdrop-blur
              "
            >
              New
            </div>
          )}
        </div>
      </Link>

      {/* ===================================================== */}
      {/* Content */}
      {/* ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          p-4
          sm:p-5
        "
      >
        {/* =================================================== */}
        {/* Title */}
        {/* =================================================== */}

        <Link
          href={`/templates/${template.slug}`}
          className="
            block
            min-w-0
          "
        >
          <h3
            className="
              line-clamp-2
              min-h-[3rem]
              text-base
              font-semibold
              leading-6
              tracking-tight
              transition-colors
              group-hover:text-primary
              sm:text-lg
            "
          >
            {template.title}
          </h3>
        </Link>

        {/* =================================================== */}
        {/* Description */}
        {/* =================================================== */}

        <p
          className="
            mt-2
            line-clamp-2
            min-h-[3rem]
            text-sm
            leading-6
            text-muted-foreground
          "
        >
          {template.description}
        </p>

        {/* =================================================== */}
        {/* Price */}
        {/* =================================================== */}

        <div
          className="
            mt-4
            flex
            min-h-[5.5rem]
            items-start
            justify-between
            gap-3
            border-b
            border-border/60
            pb-4
          "
        >
          <PriceTag
            price={currentPrice}
            originalPrice={
              hasDiscount
                ? originalPrice
                : undefined
            }
            size="md"
          />

          {/* Category */}

          <div
            className="
              max-w-[40%]
              pt-1
              text-right
            "
          >
            <span
              className="
                line-clamp-2
                text-xs
                font-medium
                text-muted-foreground
              "
            >
              {template.category}
            </span>
          </div>
        </div>

        {/* =================================================== */}
        {/* Rating + Downloads */}
        {/* =================================================== */}

        <div
          className="
            mt-4
            flex
            min-w-0
            items-center
            justify-between
            gap-3
          "
        >
          <div className="min-w-0">
            <Rating
              value={rating}
              reviewCount={reviewCount}
            />
          </div>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              text-xs
              text-muted-foreground
            "
          >
            <Download
              className="
                h-3.5
                w-3.5
              "
            />

            <span>
              {downloads.toLocaleString()}
            </span>
          </div>
        </div>

        {/* =================================================== */}
        {/* Author */}
        {/* =================================================== */}

        <div
          className="
            mt-4
            flex
            min-w-0
            items-center
            justify-between
            gap-3
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-2.5
            "
          >
            {/* Avatar */}

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-primary/10
                text-xs
                font-semibold
                text-primary
              "
            >
              {template.author?.avatar ? (
                <Image
                  src={template.author.avatar}
                  alt={authorName}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              ) : (
                authorName
                  .charAt(0)
                  .toUpperCase()
              )}
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-sm
                  font-medium
                "
              >
                {authorName}
              </p>

              <p
                className="
                  truncate
                  text-xs
                  text-muted-foreground
                "
              >
                Creator
              </p>
            </div>
          </div>

          {/* Verified */}

          {authorVerified && (
            <div
              className="
                shrink-0
                rounded-full
                bg-primary/10
                px-2.5
                py-1
                text-[11px]
                font-medium
                text-primary
              "
            >
              Verified
            </div>
          )}
        </div>

        {/* =================================================== */}
        {/* Actions */}
        {/* =================================================== */}

        <div
          className="
            mt-auto
            flex
            gap-2
            pt-5
          "
        >
          {/* Preview */}

          <Link
            href={`/templates/${template.slug}`}
            className="
              min-w-0
              flex-1
            "
          >
            <AppButton
              className="
                h-10
                w-full
                rounded-xl
                sm:h-11
              "
            >
              Preview
            </AppButton>
          </Link>

          {/* Cart */}

          {added ? (
            <Link
              href="/cart"
              className="shrink-0"
            >
              <AppButton
                className="
                  h-10
                  rounded-xl
                  px-3
                  sm:h-11
                  sm:px-4
                "
              >
                <Check
                  className="
                    mr-2
                    h-4
                    w-4
                  "
                />

                <span className="hidden sm:inline">
                  View Cart
                </span>

                <span className="sm:hidden">
                  Cart
                </span>
              </AppButton>
            </Link>
          ) : (
            <AppButton
              variant="outline"
              size="icon"
              className="
                h-10
                w-10
                shrink-0
                rounded-xl
                sm:h-11
                sm:w-11
              "
              onClick={() => add(template)}
            >
              <ShoppingCart
                className="
                  h-4
                  w-4
                "
              />
            </AppButton>
          )}
        </div>
      </div>
    </article>
  );
}

