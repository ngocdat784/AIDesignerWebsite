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

import {
  CreateOrderDto,
  OrderStatus,
} from "./dto/create-order.dto";

import { UpdateOrderDto } from "./dto/update-order.dto";

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
    @Param("status") status: OrderStatus,
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
    @Body() dto: CreateOrderDto,
  ) {
    return this.orderService.create(dto);
  }

  // =========================
  // Update
  // =========================

  // PATCH /orders/:id
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, dto);
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