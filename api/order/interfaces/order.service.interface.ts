import type { CreateOrderDto } from "../dto/create-order.dto";
import type { UpdateOrderDto } from "../dto/update-order.dto";
import type { CurrentUserPayload } from "../../auth/interfaces/current-user.interface";

export interface OrderServiceInterface {
  // =========================
  // Query
  // =========================

  getAll(): Promise<any>;

  getById(
    id: string,
    user: CurrentUserPayload,
  ): Promise<any>;

  getByUserId(
    userId: string,
    user: CurrentUserPayload,
  ): Promise<any>;

  getByStatus(
    status: string,
  ): Promise<any>;

  // =========================
  // Create
  // =========================

  create(
    dto: CreateOrderDto,
    user: CurrentUserPayload,
  ): Promise<any>;

  // =========================
  // Update
  // =========================

  update(
    id: string,
    dto: UpdateOrderDto,
  ): Promise<any>;

  // =========================
  // Delete
  // =========================

  delete(
    id: string,
  ): Promise<any>;
}