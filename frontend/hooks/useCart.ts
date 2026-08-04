"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { cartService } from "@/services/cart.service";
import type { Template } from "@/types/template/template";

export function useCart() {
  const [, forceUpdate] = useState(0);

  function refresh() {
    forceUpdate((v) => v + 1);
  }

  function add(template: Template) {
    cartService.addTemplate(template);

    toast.success(`${template.title} added to cart.`);

    refresh();
  }

  function remove(templateId: string) {
    cartService.removeTemplate(templateId);

    toast.success("Removed from cart.");

    refresh();
  }

  function clear() {
    cartService.clear();

    toast.success("Cart cleared.");

    refresh();
  }

  function increase(templateId: string) {
    const item = cartService.getItem(templateId);

    if (!item) return;

    cartService.updateQuantity(
      templateId,
      item.quantity + 1
    );

    refresh();
  }

  function decrease(templateId: string) {
    const item = cartService.getItem(templateId);

    if (!item) return;

    if (item.quantity <= 1) {
      remove(templateId);
      return;
    }

    cartService.updateQuantity(
      templateId,
      item.quantity - 1
    );

    refresh();
  }

  const items = cartService.getAll();

  return useMemo(
  () => ({
    items,

    itemCount: cartService.getItemCount(),

    subtotal: cartService.getSubtotal(),

    discount: cartService.getDiscount(),

    total: cartService.getTotal(),

    add,

    remove,

    clear,

    increase,

    decrease,
    isInCart: cartService.isInCart,
  }),
  [items]
);
}