"use client";

import { useCart } from "@/hooks/useCart";

import CartItem from "./CartItem";

export default function CartList() {
  const { items } = useCart();

  return (
    <section className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </section>
  );
}