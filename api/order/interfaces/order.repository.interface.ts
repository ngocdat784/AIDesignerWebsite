import {
  CreateOrderDto,
  OrderStatus,
} from "../dto/create-order.dto";

import { UpdateOrderDto } from "../dto/update-order.dto";

export interface OrderRepositoryInterface {
  // =========================
  // Query
  // =========================

  getAll(): Promise<any[]>;

  getById(id: string): Promise<any | null>;

  getByUserId(userId: string): Promise<any[]>;

  getByStatus(
    status: OrderStatus,
  ): Promise<any[]>;

  // =========================
  // Create
  // =========================

  create(
    data: CreateOrderDto,
  ): Promise<any>;

  // =========================
  // Update
  // =========================

  update(
    id: string,
    data: UpdateOrderDto,
  ): Promise<any>;

  // =========================
  // Delete
  // =========================

  delete(id: string): Promise<any>;
}