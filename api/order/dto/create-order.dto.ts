import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";

import { CreateOrderBillingDto } from "./create-order-billing.dto";
import { CreateOrderItemDto } from "./create-order-item.dto";

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export enum PaymentMethod {
  CARD = "card",
  PAYPAL = "paypal",
  BANK = "bank",
}

export class CreateOrderDto {
  @IsString()
  id!: string;

  @IsString()
  userId!: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @IsNumber()
  subtotal!: number;

  @IsNumber()
  discount!: number;

  @IsNumber()
  total!: number;

  @ValidateNested()
  @Type(() => CreateOrderBillingDto)
  billing!: CreateOrderBillingDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}