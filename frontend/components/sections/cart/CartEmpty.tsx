"use client";

import Link from "next/link";

import AppButton from "@/components/common/AppButton";

export default function CartEmpty() {
  return (
    <section className="space-y-6 rounded-2xl border border-dashed p-20 text-center">
      <h2 className="text-2xl font-semibold">
        Your cart is empty
      </h2>

      <p className="text-muted-foreground">
        Browse the marketplace and add your first template.
      </p>

      <Link href="/marketplace">
        <AppButton>
          Explore Marketplace
        </AppButton>
      </Link>
    </section>
  );
}