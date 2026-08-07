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
  const { add, isInCart } =
    useCart();

  const added = isInCart(
    template.id
  );

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
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Thumbnail */}

      <div className="relative aspect-[16/10] overflow-hidden">
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
            "
          >
            {template.badge.text}
          </div>
        )}
      </div>

      {/* Content */}

      <div className="space-y-5 p-6">
        {/* Title */}

        <div>
          <h3 className="text-xl font-semibold">
            {template.title}
          </h3>

          <p
            className="
              mt-2
              line-clamp-2
              text-muted-foreground
            "
          >
            {template.description}
          </p>
        </div>

        {/* Rating */}

        <div className="flex items-center justify-between">
          <div className="space-y-2 text-sm">
            <Rating
              value={template.rating}
              reviewCount={
                template.reviews
              }
            />

            <div
              className="
                flex
                items-center
                gap-1
                text-muted-foreground
              "
            >
              <Download className="h-4 w-4" />

              <span>
                {template.downloads.toLocaleString()}{" "}
                downloads
              </span>
            </div>
          </div>

          <PriceTag
            price={template.price}
            discountPrice={
              template.originalPrice
            }
          />
        </div>

        {/* Author */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            pt-4
          "
        >
          <div>
            <p className="text-sm font-medium">
              {template.author.name}
            </p>

            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              {template.category}
            </p>
          </div>

          {template.author.verified && (
            <div
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
            </div>
          )}
        </div>

        {/* Actions */}

        <div className="flex gap-3">
          <Link
             href={`/templates/${template.slug}`}
    className="flex-1"
          >
            <AppButton className="w-full">
              Preview
            </AppButton>
          </Link>

          {added ? (
            <Link href="/cart">
              <AppButton
                className="min-w-[130px]"
              >
                <Check className="mr-2 h-4 w-4" />

                View Cart
              </AppButton>
            </Link>
          ) : (
            <AppButton
              variant="outline"
              size="icon"
              onClick={() =>
                add(template)
              }
            >
              <ShoppingCart className="h-4 w-4" />
            </AppButton>
          )}
        </div>
      </div>
    </article>
  );
}