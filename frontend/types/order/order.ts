// =========================
// Order Item
// =========================

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  unitPrice: number;
  originalPrice?: number;
  quantity: number;
  subtotal: number;
}

// =========================
// Order Status
// =========================

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED";

// =========================
// Payment Method
// =========================

export type OrderPaymentMethod =
  | "card"
  | "paypal"
  | "bank";

// =========================
// Billing Snapshot
// =========================

export interface OrderBillingInfo {
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
// Order
// =========================

export interface Order {
  id: string;

  userId: string;

  status: OrderStatus;

  paymentMethod: OrderPaymentMethod;

  subtotal: number;

  discount: number;

  total: number;

  billing: OrderBillingInfo;

  items: OrderItem[];

  createdAt: string;

  updatedAt: string;
}