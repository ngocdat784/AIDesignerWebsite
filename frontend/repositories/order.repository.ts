import { apiClient } from "@/lib/api-client";

import type {
  CreateOrderData,
  Order,
  OrderStatus,
  UpdateOrderData,
} from "@/types/order/order";

// =========================
// Order Repository
// =========================

export const orderRepository = {
  // =========================
  // GET /orders
  // =========================
  //
  // ADMIN ONLY
  // =========================

  async getAll(): Promise<Order[]> {
    return apiClient<Order[]>(
      "/orders",
      {
        method: "GET",
      },
    );
  },

  // =========================
  // GET /orders/:id
  // =========================
  //
  // USER:
  //   chỉ xem order của mình
  //
  // ADMIN:
  //   xem bất kỳ order
  // =========================

  async getById(
    orderId: string,
  ): Promise<Order | null> {
    return apiClient<Order>(
      `/orders/${encodeURIComponent(orderId)}`,
      {
        method: "GET",
      },
    );
  },

  // =========================
  // GET /orders/user/:userId
  // =========================
  //
  // USER:
  //   chỉ xem order của mình
  //
  // ADMIN:
  //   xem order của user bất kỳ
  // =========================

  async getByUserId(
    userId: string,
  ): Promise<Order[]> {
    return apiClient<Order[]>(
      `/orders/user/${encodeURIComponent(userId)}`,
      {
        method: "GET",
      },
    );
  },

  // =========================
  // GET /orders/status/:status
  // =========================
  //
  // ADMIN ONLY
  // =========================

  async getByStatus(
    status: OrderStatus,
  ): Promise<Order[]> {
    return apiClient<Order[]>(
      `/orders/status/${encodeURIComponent(status)}`,
      {
        method: "GET",
      },
    );
  },

  // =========================
  // POST /orders
  // =========================
  //
  // USER ONLY
  // =========================

  async create(
    data: CreateOrderData,
  ): Promise<Order> {
    return apiClient<Order>(
      "/orders",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  },

  // =========================
  // PATCH /orders/:id
  // =========================
  //
  // ADMIN ONLY
  // =========================

  async update(
    orderId: string,
    data: UpdateOrderData,
  ): Promise<Order> {
    return apiClient<Order>(
      `/orders/${encodeURIComponent(orderId)}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );
  },

  // =========================
  // DELETE /orders/:id
  // =========================
  //
  // ADMIN ONLY
  // =========================

  async delete(
    orderId: string,
  ): Promise<Order> {
    return apiClient<Order>(
      `/orders/${encodeURIComponent(orderId)}`,
      {
        method: "DELETE",
      },
    );
  },
};