// =========================
// Order Billing Response
// =========================

export interface OrderBillingResponse {
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
// Order Payment Response
// =========================

export type OrderPaymentMethodResponse =
  | "card"
  | "paypal"
  | "bank";

// =========================
// Order Status Response
// =========================

export type OrderStatusResponse =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED";

// =========================
// Order Item Response
// =========================

export interface OrderItemResponse {
  id: string;
  orderId: string;

  productId: string;
  productName: string;

  unitPrice: number;
  quantity: number;
  subtotal: number;
}

// =========================
// Order Response
// =========================

export interface OrderResponse {
  id: string;

  userId: string;

  status: OrderStatusResponse;

  paymentMethod: OrderPaymentMethodResponse;

  subtotal: number;
  discount: number;
  total: number;

  billing: OrderBillingResponse;

  items: OrderItemResponse[];

  createdAt: string;
  updatedAt: string;
}

// =========================
// Order List Response
// =========================

export interface OrderListResponse {
  items: OrderResponse[];
  total: number;
}