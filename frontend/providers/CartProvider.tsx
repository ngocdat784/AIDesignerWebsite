"use client";

import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import { CartContext } from "@/contexts/CartContext";
import { cartService } from "@/services/cart.service";

import type { CartContextType } from "@/types/cart";
import type { CartItem } from "@/types/cart/cart-item";

import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

interface Props {
  children: ReactNode;
}

export default function CartProvider({
  children,
}: Props) {
  const [items, setItems] =
    useState<CartItem[]>([]);

  // =========================
  // Refresh
  // =========================

  function refresh() {
    setItems(
      cartService.getAll()
    );
  }

  // =========================
  // Initial Load
  // =========================

  useEffect(() => {
    refresh();

    function handleStorage() {
      refresh();
    }

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  // =========================
  // Add
  // =========================

  function add(
    template: MarketplaceTemplate,
    styleId?: string | null
  ) {
    // Nếu UI truyền styleId
    // → sử dụng style user đã chọn.
    //
    // Nếu không truyền
    // → cartService sẽ fallback
    // về template.styleId.

    cartService.addTemplate(
      template,
      styleId
    );

    toast.success(
      `${template.title} added to cart.`
    );

    refresh();
  }

  // =========================
  // Remove
  // =========================

  function remove(
    templateId: string
  ) {
    cartService.removeTemplate(
      templateId
    );

    toast.success(
      "Removed from cart."
    );

    refresh();
  }

  // =========================
  // Clear
  // =========================

  function clear() {
    cartService.clear();

    toast.success(
      "Cart cleared."
    );

    refresh();
  }

  // =========================
  // Increase
  // =========================

  function increase(
    templateId: string
  ) {
    const item =
      cartService.getItem(
        templateId
      );

    if (!item) {
      return;
    }

    cartService.updateQuantity(
      templateId,
      item.quantity + 1
    );

    refresh();
  }

  // =========================
  // Decrease
  // =========================

  function decrease(
    templateId: string
  ) {
    const item =
      cartService.getItem(
        templateId
      );

    if (!item) {
      return;
    }

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

  // =========================
  // Context Value
  // =========================

  const value: CartContextType =
    useMemo(
      () => ({
        items,

        itemCount:
          cartService.getItemCount(),

        subtotal:
          cartService.getSubtotal(),

        discount:
          cartService.getDiscount(),

        total:
          cartService.getTotal(),

        add,

        remove,

        clear,

        increase,

        decrease,

        isInCart:
          cartService.isInCart,
      }),
      [items]
    );

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}