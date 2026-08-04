"use client";

import { ShoppingCart } from "lucide-react";

export default function CartHeader() {
  return (
    <section className="flex items-center gap-4">
      <ShoppingCart className="h-8 w-8" />

      <div>
        <h1 className="text-3xl font-bold">
          Shopping Cart
        </h1>

        <p className="text-muted-foreground">
          Review your selected templates.
        </p>
      </div>
    </section>
  );
}