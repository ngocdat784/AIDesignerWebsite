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
// Order User
// =========================
//
// Backend trả về user khi:
// GET /orders
// GET /orders/:id
// POST /orders
//

export interface OrderUser {
  id: string;

  name: string;

  avatar?: string | null;

  email: string;

  role?: string;

  createdAt?: string;

  updatedAt?: string;
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

  user?: OrderUser | null;

  createdAt: string;

  updatedAt: string;
}

// =========================
// Create Order Data
// =========================
//
// POST /orders
//

export interface CreateOrderData {
  id: string;

  userId: string;

  status?: OrderStatus;

  paymentMethod: OrderPaymentMethod;

  subtotal: number;

  discount: number;

  total: number;

  billing: OrderBillingInfo;

  items: OrderItem[];
}

// =========================
// Update Order Data
// =========================
//
// PATCH /orders/:id
//
// ADMIN ONLY
//

export interface UpdateOrderData {
  status?: OrderStatus;

  paymentMethod?: OrderPaymentMethod;

  subtotal?: number;

  discount?: number;

  total?: number;
}