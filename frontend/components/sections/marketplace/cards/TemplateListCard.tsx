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
        overflow-hidden
        rounded-3xl
        border
        bg-card
        transition-all
        duration-300
        hover:shadow-xl
      "
    >
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail */}

        <div
          className="
            relative
            h-64
            md:h-auto
            md:w-[360px]
            shrink-0
            overflow-hidden
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
                left-5
                top-5
                rounded-full
                bg-primary
                px-3
                py-1
                text-xs
                font-semibold
                text-primary-foreground
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
            flex-1
            flex-col
            justify-between
            p-8
          "
        >
          <div className="space-y-5">
            {/* Title */}

            <div>
              <h2 className="text-3xl font-bold">
                {template.title}
              </h2>

              <p className="mt-3 text-muted-foreground leading-7">
                {template.description}
              </p>
            </div>

            {/* Rating */}

            <div className="flex flex-wrap items-center gap-6">
              <Rating
                value={template.rating}
                reviewCount={template.reviews}
              />

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-muted-foreground
                "
              >
                <Download className="h-4 w-4" />

                {template.downloads.toLocaleString()} downloads
              </div>
            </div>

            {/* Author */}

            <div
              className="
                flex
                items-center
                justify-between
                border-t
                pt-5
              "
            >
              <div>
                <p className="font-medium">
                  {template.author.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  {template.category}
                </p>
              </div>

              {template.author.verified && (
                <span
                  className="
                    rounded-full
                    bg-primary/10
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-primary
                  "
                >
                  Verified
                </span>
              )}
            </div>
          </div>

          {/* Bottom */}

          <div
            className="
              mt-8
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <PriceTag
              price={template.price}
              discountPrice={template.originalPrice}
            />

            <div className="flex gap-3">
              <Link
                href={`/templates/${template.slug}`}
              >
                <AppButton variant="outline">
                  Live Preview
                </AppButton>
              </Link>

              {added ? (
                <Link href="/cart">
                  <AppButton>
                    <Check className="mr-2 h-4 w-4" />
                    View Cart
                  </AppButton>
                </Link>
              ) : (
                <AppButton
                  onClick={() => add(template)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </AppButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}