"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";

import AppButton from "@/components/common/AppButton";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          {/* Success Icon */}
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-primary
            "
          >
            <CheckCircle2 className="h-10 w-10" />
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
            Order Placed Successfully
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-muted-foreground
              md:text-lg
            "
          >
            Thank you for your order. Your order has been
            successfully submitted and is now being processed.
          </p>

          {/* Status Card */}
          <div
            className="
              mt-10
              w-full
              rounded-2xl
              border
              bg-card
              p-6
              text-left
              shadow-sm
            "
          >
            <div className="flex items-start gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                "
              >
                <ShoppingBag className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Your order is being processed
                </h2>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  We have received your order information.
                  You can continue browsing the marketplace
                  while your order is being processed.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            className="
              mt-8
              flex
              w-full
              flex-col
              gap-3
              sm:flex-row
              sm:justify-center
            "
          >
            <Link href="/marketplace">
              <AppButton
                type="button"
                className="
                  h-12
                  w-full
                  rounded-xl
                  px-6
                  text-base
                  font-semibold
                  sm:w-auto
                "
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </AppButton>
            </Link>

            <Link href="/">
              <AppButton
                type="button"
                variant="outline"
                className="
                  h-12
                  w-full
                  rounded-xl
                  px-6
                  text-base
                  font-semibold
                  sm:w-auto
                "
              >
                Back to Home
              </AppButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}