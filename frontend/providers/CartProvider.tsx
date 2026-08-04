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

import type {
  CartContextType,
} from "@/types/cart";
import type { CartItem } from "@/types/cart/cart-item";
import type { Template } from "@/types/template/template";

interface Props {
  children: ReactNode;
}

export default function CartProvider({
  children,
}: Props) {
  const [items, setItems] = useState<CartItem[]>([]);

  function refresh() {
    setItems(cartService.getAll());
  }

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

  function add(template: Template) {
    cartService.addTemplate(template);

    toast.success(
      `${template.title} added to cart.`
    );

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

  const value: CartContextType = useMemo(
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