"use client";

import Image from "next/image";
import Link from "next/link";

import { Download } from "lucide-react";

import PriceTag from "@/components/common/PriceTag";
import Rating from "@/components/common/Rating";

import type { CheckoutItem } from "@/types/checkout";

interface OrderSummaryProps {
  items: CheckoutItem[];
  subtotal: number;
  discount: number;
  total: number;
  className?: string;
}

export default function OrderSummary({
  items,
  subtotal,
  discount,
  total,
  className,
}: OrderSummaryProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        bg-card
        p-6
        shadow-sm
        lg:p-7
      "
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold">
          Order Summary
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Review the templates in your order.
        </p>
      </div>

      {/* Items */}
      <div className="mt-6 space-y-5">
        {items.length === 0 ? (
          <div
            className="
              rounded-xl
              border
              border-dashed
              p-6
              text-center
            "
          >
            <p className="text-sm text-muted-foreground">
              Your cart is empty.
            </p>

            <Link
              href="/marketplace"
              className="
                mt-3
                inline-flex
                text-sm
                font-medium
                text-primary
                hover:underline
              "
            >
              Browse Marketplace
            </Link>
          </div>
        ) : (
          items.map((item) => {
            const template = item.template;

            return (
              <div
                key={template.id}
                className="
                  flex
                  gap-4
                  border-b
                  pb-5
                  last:border-b-0
                  last:pb-0
                "
              >
                {/* Thumbnail */}
                <div
                  className="
                    relative
                    h-20
                    w-24
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    border
                    bg-muted
                  "
                >
                  <Image
                    src={template.thumbnail}
                    alt={template.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Information */}
                <div className="min-w-0 flex-1">
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div className="min-w-0">
                      <h3
                        className="
                          line-clamp-1
                          text-sm
                          font-semibold
                        "
                      >
                        {template.title}
                      </h3>

                      <p
                        className="
                          mt-1
                          line-clamp-1
                          text-xs
                          text-muted-foreground
                        "
                      >
                        {template.category}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="shrink-0 text-right">
                      <PriceTag
                        price={template.price}
                        discountPrice={
                          template.originalPrice
                        }
                      />
                    </div>
                  </div>

                  {/* Meta */}
                  <div
                    className="
                      mt-3
                      flex
                      flex-wrap
                      items-center
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
                        items-center
                        gap-1
                        text-xs
                        text-muted-foreground
                      "
                    >
                      <Download className="h-3.5 w-3.5" />

                      {template.downloads.toLocaleString()}
                    </div>

                    <span
                      className="
                        rounded-full
                        bg-muted
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                      "
                    >
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Totals */}
      {items.length > 0 && (
        <div className="mt-6 border-t pt-6">
          <div className="space-y-3 text-sm">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Subtotal
              </span>

              <span className="font-medium">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Discount
                </span>

                <span className="font-medium text-green-600">
                  -${discount.toFixed(2)}
                </span>
              </div>
            )}

            {/* Total */}
            <div
              className="
                flex
                items-center
                justify-between
                border-t
                pt-4
              "
            >
              <span className="text-base font-semibold">
                Total
              </span>

              <span
                className="
                  text-xl
                  font-bold
                  text-primary
                "
              >
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}