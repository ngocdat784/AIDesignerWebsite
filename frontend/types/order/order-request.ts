
// =========================
// Create Order Billing
// =========================

export interface CreateOrderBillingInfo {
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
// Create Order Payment
// =========================

export type CreateOrderPaymentMethod =
  | "card"
  | "paypal"
  | "bank";

// =========================
// Create Order Item
// =========================

export interface CreateOrderItemRequest {
  productId: string;
  productName: string;
  unitPrice: number;
  originalPrice?: number;
  quantity: number;
}

// =========================
// Create Order Request
// =========================

export interface CreateOrderRequest {
  billing: CreateOrderBillingInfo;
  payment: CreateOrderPaymentMethod;
  items: CreateOrderItemRequest[];
}