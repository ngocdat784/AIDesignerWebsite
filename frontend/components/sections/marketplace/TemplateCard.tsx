"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Check,
  Download,
  ShoppingCart,
} from "lucide-react";

import { Template } from "@/types";

import AppButton from "@/components/common/AppButton";
import Rating from "@/components/common/Rating";
import PriceTag from "@/components/common/PriceTag";

import { useCart } from "@/hooks/useCart";

interface Props {
  template: Template;
}

export default function TemplateCard({
  template,
}: Props) {
  const {
    add,
    isInCart,
  } = useCart();

  const added = isInCart(template.id);

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        bg-card
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-primary/30
      "
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={template.thumbnail}
          alt={template.title}
          fill
          className="
            object-cover
            transition-all
            duration-500
            ease-out
            group-hover:scale-105
            group-hover:brightness-105
          "
        />
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-xl font-semibold">
            {template.title}
          </h3>

          <p className="mt-2 text-muted-foreground">
            {template.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-2 text-sm">
            <Rating
              value={template.rating}
              reviewCount={template.reviewCount}
            />

            <div className="flex items-center gap-1 text-muted-foreground">
              <Download className="h-4 w-4" />

              <span>
                {template.downloads} downloads
              </span>
            </div>
          </div>

          <PriceTag
            price={template.price}
            discountPrice={template.discountPrice}
          />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/templates/${template.slug}`}
            className="flex-1"
          >
            <AppButton
              className="
                w-full
                transition-all
                duration-300
                ease-out
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              Preview
            </AppButton>
          </Link>

          {added ? (
            <Link href="/cart">
              <AppButton
                title="View Cart"
                className="
                  min-w-[130px]
                  transition-all
                  duration-300
                  ease-out
                  hover:scale-105
                  active:scale-95
                "
              >
                <Check
                  className="
                    mr-2
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:rotate-12
                  "
                />

                View Cart
              </AppButton>
            </Link>
          ) : (
            <AppButton
              title="Add to Cart"
              variant="outline"
              size="icon"
              onClick={() => add(template)}
              className="
                transition-all
                duration-300
                ease-out
                hover:scale-110
                hover:border-primary
                hover:text-primary
                active:scale-95
              "
            >
              <ShoppingCart
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:rotate-6
                "
              />
            </AppButton>
          )}
        </div>
      </div>
    </article>
  );
}