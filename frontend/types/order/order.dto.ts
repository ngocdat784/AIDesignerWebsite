import type {
  OrderBillingInfo,
  OrderPaymentMethod,
} from "./order";

// =========================
// Create Order Item DTO
// =========================

export interface CreateOrderItemDto {
  productId: string;
  productName: string;
  unitPrice: number;
  originalPrice?: number;
  quantity: number;
}

// =========================
// Create Order DTO
// =========================

export interface CreateOrderDto {
  billing: OrderBillingInfo;
  paymentMethod: OrderPaymentMethod;
  items: CreateOrderItemDto[];
}