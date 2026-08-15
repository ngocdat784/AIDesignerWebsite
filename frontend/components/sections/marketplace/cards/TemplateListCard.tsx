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

import type { MarketplaceTemplate } from "../types";

interface TemplateListCardProps {
  template: MarketplaceTemplate;
}

export default function TemplateListCard({
  template,
}: TemplateListCardProps) {
  const { add, isInCart } = useCart();

  const added = isInCart(template.id);

  return (
    <article
      className="
        group
        flex
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-lg
        md:flex-row
      "
    >
      {/* Thumbnail */}

      <div
        className="
          relative
          h-56
          w-full
          shrink-0
          overflow-hidden
          bg-muted
          md:h-auto
          md:w-[300px]
        "
      >
        <Image
          src={template.thumbnail}
          alt={template.title}
          fill
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {template.badge && (
          <div
            className="
              absolute
              left-4
              top-4
              rounded-full
              bg-primary
              px-3
              py-1
              text-xs
              font-semibold
              text-primary-foreground
              shadow-sm
            "
          >
            {template.badge.text}
          </div>
        )}
      </div>

      {/* Content */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          p-6
        "
      >
        {/* Main Content */}

        <div className="flex-1">
          {/* Title + Price */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <h2
              className="
                line-clamp-1
                text-2xl
                font-bold
                leading-7
                tracking-tight
              "
            >
              {template.title}
            </h2>

            <div className="shrink-0">
              <PriceTag
                price={template.price}
                discountPrice={
                  template.originalPrice ?? undefined
                }
              />
            </div>
          </div>

          {/* Description */}

          <p
            className="
              mt-3
              line-clamp-2
              max-w-3xl
              text-sm
              leading-6
              text-muted-foreground
            "
          >
            {template.description}
          </p>

          {/* Rating + Downloads */}

          <div
            className="
              mt-4
              flex
              flex-wrap
              items-center
              gap-x-6
              gap-y-2
            "
          >
            <Rating
              value={template.rating}
              reviewCount={template.reviews}
            />

            <div
              className="
                flex
                items-center
                gap-1.5
                text-sm
                text-muted-foreground
              "
            >
              <Download className="h-4 w-4" />

              <span>
                {template.downloads.toLocaleString()}
              </span>

              <span>downloads</span>
            </div>
          </div>

          {/* Author */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              border-t
              pt-4
            "
          >
            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-sm
                  font-medium
                "
              >
                {template.author.name}
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-xs
                  text-muted-foreground
                "
              >
                {template.category}
              </p>
            </div>

            {template.author.verified && (
              <span
                className="
                  ml-3
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
              </span>
            )}
          </div>
        </div>

        {/* Actions */}

        <div
          className="
            mt-5
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-end
          "
        >
          <Link
            href={`/templates/${template.slug}`}
            className="sm:w-auto"
          >
            <AppButton
              variant="outline"
              className="
                h-10
                w-full
                rounded-xl
                sm:w-auto
              "
            >
              Live Preview
            </AppButton>
          </Link>

          {added ? (
            <Link href="/cart">
              <AppButton
                className="
                  h-10
                  w-full
                  rounded-xl
                  sm:w-auto
                "
              >
                <Check className="mr-2 h-4 w-4" />

                View Cart
              </AppButton>
            </Link>
          ) : (
            <AppButton
              className="
                h-10
                w-full
                rounded-xl
                sm:w-auto
              "
              onClick={() => add(template)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />

              Add to Cart
            </AppButton>
          )}
        </div>
      </div>
    </article>
  );
}