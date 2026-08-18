import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

import type { Order } from "@/types/order/order";

// =========================
// Checkout Item
// =========================

export interface CheckoutItem {
  template: MarketplaceTemplate;
  quantity: number;
}

// =========================
// Billing
// =========================

export interface CheckoutBillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

// =========================
// Payment
// =========================

export interface CheckoutPaymentInfo {
  method: "card" | "paypal" | "bank";
}

// =========================
// Checkout Order
// =========================

export interface CheckoutOrder {
  items: CheckoutItem[];
  subtotal: number;
  discount: number;
  total: number;
}

// =========================
// Checkout Data
// =========================

export interface CheckoutData {
  billing: CheckoutBillingInfo;
  payment: CheckoutPaymentInfo;
  order: CheckoutOrder;
}

// =========================
// Checkout Context
// =========================

export interface CheckoutContextType {
  checkout: CheckoutData | null;

  items: CheckoutItem[];

  billing: CheckoutBillingInfo | null;

  payment: CheckoutPaymentInfo | null;

  subtotal: number;

  discount: number;

  total: number;

  initialize: () => void;

  refresh: () => void;

  updateBilling: (
    billing: CheckoutBillingInfo
  ) => void;

  updatePayment: (
    payment: CheckoutPaymentInfo
  ) => void;

  validateBilling: () => boolean;

  validatePayment: () => boolean;

  validateCheckout: () => boolean;

  createOrder: () => Promise<Order | null>;

  clear: () => void;
}