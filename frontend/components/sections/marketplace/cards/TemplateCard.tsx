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

  return (
    <article
      className="
        group
        flex
        h-full
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
      "
    >
      {/* Thumbnail */}

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
          flex-1
          flex-col
          p-5
        "
      >
        {/* Title + Description */}

        <div>
          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >
            <h3
              className="
                line-clamp-1
                text-lg
                font-semibold
                leading-6
                tracking-tight
              "
            >
              {template.title}
            </h3>

            <PriceTag
              price={template.price}
              discountPrice={template.originalPrice}
            />
          </div>

          <p
            className="
              mt-2
              line-clamp-2
              text-sm
              leading-6
              text-muted-foreground
            "
          >
            {template.description}
          </p>
        </div>

        {/* Rating + Downloads */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <Rating
            value={template.rating}
            reviewCount={template.reviews}
          />

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
            <Download className="h-3.5 w-3.5" />

            <span>
              {template.downloads.toLocaleString()}
            </span>
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
            <div
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
            </div>
          )}
        </div>

        {/* Actions */}

        <div
          className="
            mt-5
            flex
            gap-2.5
          "
        >
          <Link
            href={`/templates/${template.slug}`}
            className="min-w-0 flex-1"
          >
            <AppButton
              className="
                h-11
                w-full
                rounded-xl
              "
            >
              Preview
            </AppButton>
          </Link>

          {added ? (
            <Link href="/cart">
              <AppButton
                className="
                  h-11
                  rounded-xl
                  px-4
                "
              >
                <Check className="mr-2 h-4 w-4" />

                View Cart
              </AppButton>
            </Link>
          ) : (
            <AppButton
              variant="outline"
              size="icon"
              className="
                h-11
                w-11
                shrink-0
                rounded-xl
              "
              onClick={() => add(template)}
            >
              <ShoppingCart className="h-4 w-4" />
            </AppButton>
          )}
        </div>
      </div>
    </article>
  );
}