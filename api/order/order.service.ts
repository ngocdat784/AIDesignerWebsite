import { Injectable, Inject } from "@nestjs/common";
import { OrderRepository } from "../repositories/order.repository";
import { OrderServiceInterface } from "./interfaces/order.service.interface";

@Injectable()
export class OrderService implements OrderServiceInterface {
  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {
    console.log("OrderService injected successfully.");
  }

  // =========================
  // Query
  // =========================

  async getAll() {
    return this.orderRepository.getAll();
  }

  async getById(id: string) {
    return this.orderRepository.getById(id);
  }

  async getByUserId(userId: string) {
    return this.orderRepository.getByUserId(userId);
  }

  async getByStatus(
    status:
      | "PENDING"
      | "PAID"
      | "PROCESSING"
      | "COMPLETED"
      | "CANCELLED"
      | "FAILED",
  ) {
    return this.orderRepository.getByStatus(status);
  }

  // =========================
  // Create
  // =========================

  async create(data: {
    id: string;
    userId: string;

    status?:
      | "PENDING"
      | "PAID"
      | "PROCESSING"
      | "COMPLETED"
      | "CANCELLED"
      | "FAILED";

    paymentMethod:
      | "card"
      | "paypal"
      | "bank";

    subtotal: number;
    discount: number;
    total: number;

    billing: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      country: string;
      postalCode: string;
    };

    items: {
      id: string;
      productId: string;
      productName: string;
      unitPrice: number;
      quantity: number;
      subtotal: number;
    }[];
  }) {
    return this.orderRepository.create(data);
  }

  // =========================
  // Update
  // =========================

  async update(
    id: string,
    data: {
      status?:
        | "PENDING"
        | "PAID"
        | "PROCESSING"
        | "COMPLETED"
        | "CANCELLED"
        | "FAILED";

      paymentMethod?:
        | "card"
        | "paypal"
        | "bank";

      subtotal?: number;
      discount?: number;
      total?: number;
    },
  ) {
    return this.orderRepository.update(id, data);
  }

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    return this.orderRepository.delete(id);
  }
}