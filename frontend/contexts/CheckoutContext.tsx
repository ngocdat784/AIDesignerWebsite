"use client";

import {
  createContext,
  useContext,
} from "react";

import type { CheckoutContextType } from "@/types/checkout";

export const CheckoutContext =
  createContext<CheckoutContextType | null>(null);

export function useCheckoutContext() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error(
      "useCheckoutContext must be used inside CheckoutProvider."
    );
  }

  return context;
}