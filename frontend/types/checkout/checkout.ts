import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

export interface CheckoutItem {
  template: MarketplaceTemplate;
  quantity: number;
}

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

export interface CheckoutPaymentInfo {
  method: "card" | "paypal" | "bank";
}

export interface CheckoutOrder {
  items: CheckoutItem[];
  subtotal: number;
  discount: number;
  total: number;
}

export interface CheckoutData {
  billing: CheckoutBillingInfo;
  payment: CheckoutPaymentInfo;
  order: CheckoutOrder;
}

/**
 * Context API exposed to Checkout components.
 */
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
  ) => CheckoutData | null;

  updatePayment: (
    payment: CheckoutPaymentInfo
  ) => CheckoutData | null;

  validateBilling: () => boolean;

  validatePayment: () => boolean;

  validateCheckout: () => boolean;

  createOrder: () => CheckoutData | null;

  clear: () => void;
}