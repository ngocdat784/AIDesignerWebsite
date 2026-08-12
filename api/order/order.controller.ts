import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { OrderService } from "./order.service";

@Controller("orders")
export class OrderController {
  constructor(
    @Inject(OrderService)
    private readonly orderService: OrderService,
  ) {
    console.log("OrderController injected successfully.");
  }

  // =========================
  // Query
  // =========================

  // GET /orders
  @Get()
  async getAll() {
    return this.orderService.getAll();
  }

  // GET /orders/user/:userId
  @Get("user/:userId")
  async getByUserId(
    @Param("userId") userId: string,
  ) {
    return this.orderService.getByUserId(userId);
  }

  // GET /orders/status/:status
  @Get("status/:status")
  async getByStatus(
    @Param("status") status:
      | "PENDING"
      | "PAID"
      | "PROCESSING"
      | "COMPLETED"
      | "CANCELLED"
      | "FAILED",
  ) {
    return this.orderService.getByStatus(status);
  }

  // GET /orders/:id
  @Get(":id")
  async getById(
    @Param("id") id: string,
  ) {
    return this.orderService.getById(id);
  }

  // =========================
  // Create
  // =========================

  // POST /orders
  @Post()
  async create(
    @Body()
    data: {
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
    },
  ) {
    return this.orderService.create(data);
  }

  // =========================
  // Update
  // =========================

  // PATCH /orders/:id
  @Patch(":id")
  async update(
    @Param("id") id: string,

    @Body()
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
    return this.orderService.update(id, data);
  }

  // =========================
  // Delete
  // =========================

  // DELETE /orders/:id
  @Delete(":id")
  async delete(
    @Param("id") id: string,
  ) {
    return this.orderService.delete(id);
  }
}