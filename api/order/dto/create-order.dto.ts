import {
  IsArray,
  IsEnum,
  ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";

import { CreateOrderBillingDto } from "./create-order-billing.dto";
import { CreateOrderItemDto } from "./create-order-item.dto";

// =========================
// Order Status
// =========================

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

// =========================
// Payment Method
// =========================

export enum PaymentMethod {
  CARD = "card",
  PAYPAL = "paypal",
  BANK = "bank",
}

// =========================
// Create Order DTO
// =========================

export class CreateOrderDto {
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @ValidateNested()
  @Type(() => CreateOrderBillingDto)
  billing!: CreateOrderBillingDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}