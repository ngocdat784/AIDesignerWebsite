"use client";

import { useMemo, useState } from "react";

import { cartService } from "@/services/cart.service";
import type { Template } from "@/types/template/template";

export function useCart() {
  const [, forceUpdate] = useState(0);

  function refresh() {
    forceUpdate((v) => v + 1);
  }

  function add(template: Template) {
    cartService.addTemplate(template);
    refresh();
  }

  function remove(templateId: string) {
    cartService.removeTemplate(templateId);
    refresh();
  }

  function clear() {
    cartService.clear();
    refresh();
  }

  function increase(templateId: string) {
    const item = cartService
      .getItems()
      .find((i) => i.template.id === templateId);

    if (!item) return;

    cartService.updateQuantity(
      templateId,
      item.quantity + 1
    );

    refresh();
  }

  function decrease(templateId: string) {
    const item = cartService
      .getItems()
      .find((i) => i.template.id === templateId);

    if (!item) return;

    if (item.quantity === 1) {
      remove(templateId);
      return;
    }

    cartService.updateQuantity(
      templateId,
      item.quantity - 1
    );

    refresh();
  }

  const items = cartService.getItems();

  return useMemo(
    () => ({
      items,

      subtotal: cartService.getSubtotal(),

      discount: cartService.getDiscount(),

      total: cartService.getTotal(),

      add,

      remove,

      clear,

      increase,

      decrease,
    }),
    [items]
  );
}