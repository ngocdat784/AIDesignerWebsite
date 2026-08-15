"use client";

import Link from "next/link";

import {
  Check,
  ShieldCheck,
  ShoppingCart,
  CreditCard,
  ExternalLink,
} from "lucide-react";

import AppButton from "@/components/common/AppButton";
import PriceTag from "@/components/common/PriceTag";

import { useCart } from "@/hooks/useCart";

import type { TemplateDetailProps } from "./types";

export default function TemplatePriceCard({
  template,
}: TemplateDetailProps) {
  const {
    add,
    isInCart,
    itemCount,
    subtotal,
  } = useCart();

  const added = isInCart(template.id);

  return (
    <aside
      className="
        rounded-3xl
        border
        bg-card
        p-6
        shadow-sm
        transition-all
        duration-300
        ease-out
        hover:shadow-lg
        hover:border-primary/30
      "
    >
      <div className="space-y-6">

        {/* =========================
            Price
        ========================= */}

        <PriceTag
          price={template.price}
          discountPrice={
            template.discountPrice ??
            undefined
          }
        />

        {/* =========================
            Benefits
        ========================= */}

        <div className="space-y-3 text-sm text-muted-foreground">
          <div>Lifetime Updates</div>

          <div>Premium Support</div>

          <div>
            {template.license ?? "Standard License"}
          </div>
        </div>

        {/* =========================
            Actions
        ========================= */}

        <div className="space-y-3">

          {/* Buy Now */}

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
            <CreditCard className="mr-2 h-4 w-4" />
            Buy Now
          </AppButton>

          {/* Cart */}

          {added ? (
            <>
              <Link href="/cart">
                <AppButton
                  className="
                    w-full
                    min-h-11
                    transition-all
                    duration-300
                    ease-out
                    hover:scale-[1.02]
                    active:scale-[0.98]
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

              {/* Cart summary */}

              <div
                className="
                  rounded-2xl
                  border
                  bg-muted/40
                  p-4
                  space-y-3
                  animate-in
                  fade-in
                  slide-in-from-top-2
                  duration-300
                "
              >
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-4 w-4" />

                  <span className="font-medium">
                    Added to your cart
                  </span>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Items</span>

                  <span>
                    {itemCount}
                  </span>
                </div>

                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>

                  <span>
                    ${subtotal}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">

                  <Link href="/cart">
                    <AppButton
                      variant="outline"
                      className="w-full"
                    >
                      View Cart
                    </AppButton>
                  </Link>

                  <Link href="/checkout">
                    <AppButton className="w-full">
                      Checkout
                    </AppButton>
                  </Link>

                </div>

                <Link
                  href="/marketplace"
                  className="
                    block
                    text-center
                    text-sm
                    text-muted-foreground
                    transition-colors
                    hover:text-primary
                  "
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          ) : (
            <AppButton
              variant="outline"
              className="
                w-full
                transition-all
                duration-300
                ease-out
                hover:scale-[1.02]
                hover:border-primary
                hover:text-primary
                active:scale-[0.98]
              "
              onClick={() => add(template)}
            >
              <ShoppingCart
                className="
                  mr-2
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:rotate-6
                "
              />

              Add to Cart
            </AppButton>
          )}

          {/* Live Demo */}

          {template.demoUrl && (
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppButton
                variant="secondary"
                className="
                  w-full
                  transition-all
                  duration-300
                  ease-out
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </AppButton>
            </a>
          )}

        </div>

        {/* =========================
            Security
        ========================= */}

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-muted/40
            p-3
            text-xs
            text-muted-foreground
          "
        >
          <ShieldCheck className="h-4 w-4 text-green-500" />

          <span>
            Secure payment. Instant download.
          </span>
        </div>

      </div>
    </aside>
  );
}