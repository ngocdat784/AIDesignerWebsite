"use client";

import {
  createContext,
  useContext,
} from "react";

import type { CartContextType } from "@/types/cart";

export const CartContext =
  createContext<CartContextType | null>(
    null
  );

export function useCartContext() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider."
    );
  }

  return context;
}