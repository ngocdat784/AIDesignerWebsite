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

  // =========================================================
  // REFRESH
  // =========================================================

  function refresh() {
    setItems(
      cartService.getAll()
    );
  }

  // =========================================================
  // INITIAL LOAD
  // =========================================================

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

  // =========================================================
  // ADD
  // =========================================================

  function add(
    template: MarketplaceTemplate,
    styleId?: string | null
  ) {
    cartService.addTemplate(
      template,
      styleId
    );

    toast.success(
      `${template.title} added to cart.`
    );

    refresh();
  }

  // =========================================================
  // REMOVE
  // =========================================================

  /**
   * Xóa một CartItem cụ thể.
   *
   * Ưu tiên CartItem.id vì:
   *
   * Template A + Modern
   * Template A + Dark
   *
   * là 2 item khác nhau.
   */
  function remove(
    templateId: string,
    styleId?: string | null
  ) {
    cartService.removeTemplate(
      templateId,
      styleId
    );

    toast.success(
      "Removed from cart."
    );

    refresh();
  }

  // =========================================================
  // CLEAR
  // =========================================================

  function clear() {
    cartService.clear();

    toast.success(
      "Cart cleared."
    );

    refresh();
  }

  // =========================================================
  // INCREASE
  // =========================================================

  function increase(
    templateId: string,
    styleId?: string | null
  ) {
    const item =
      cartService.getItem(
        templateId,
        styleId
      );

    if (!item) {
      return;
    }

    cartService.updateQuantity(
      templateId,
      item.quantity + 1,
      styleId
    );

    refresh();
  }

  // =========================================================
  // DECREASE
  // =========================================================

  function decrease(
    templateId: string,
    styleId?: string | null
  ) {
    const item =
      cartService.getItem(
        templateId,
        styleId
      );

    if (!item) {
      return;
    }

    // Quantity = 1
    // → xóa item hiện tại.
    if (item.quantity <= 1) {
      remove(
        templateId,
        styleId
      );

      return;
    }

    cartService.updateQuantity(
      templateId,
      item.quantity - 1,
      styleId
    );

    refresh();
  }

  // =========================================================
  // CONTEXT VALUE
  // =========================================================

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

  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}