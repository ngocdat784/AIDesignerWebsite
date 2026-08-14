import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { OrderService } from "./order.service";

import {
  CreateOrderDto,
  OrderStatus,
} from "./dto/create-order.dto";

import { UpdateOrderDto } from "./dto/update-order.dto";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RoleGuard } from "../auth/guards/role.guard";

import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";

import { CurrentUserPayload } from "../auth/interfaces/current-user.interface";

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
  // ADMIN: xem tất cả order
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("ADMIN")
  @Get()
  async getAll() {
    return this.orderService.getAll();
  }

  // GET /orders/user/:userId
  // USER: chỉ xem order của chính mình
  // ADMIN: xem order của bất kỳ user nào
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("USER", "ADMIN")
  @Get("user/:userId")
  async getByUserId(
    @Param("userId") userId: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.orderService.getByUserId(
      userId,
      user,
    );
  }

  // GET /orders/status/:status
  // ADMIN quản lý theo trạng thái
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("ADMIN")
  @Get("status/:status")
  async getByStatus(
    @Param("status") status: OrderStatus,
  ) {
    return this.orderService.getByStatus(status);
  }

  // GET /orders/:id
  // USER: xem order của mình
  // ADMIN: xem bất kỳ order
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("USER", "ADMIN")
  @Get(":id")
  async getById(
    @Param("id") id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.orderService.getById(
      id,
      user,
    );
  }

  // =========================
  // Create
  // =========================

  // POST /orders
  // USER tạo order cho chính mình
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("USER")
  @Post()
  async create(
    @Body() dto: CreateOrderDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.orderService.create(
      dto,
      user,
    );
  }

  // =========================
  // Update
  // =========================

  // PATCH /orders/:id
  // ADMIN có quyền update
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("ADMIN")
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.orderService.update(
      id,
      dto,
    );
  }

  // =========================
  // Delete
  // =========================

  // DELETE /orders/:id
  // ADMIN có quyền delete
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("ADMIN")
  @Delete(":id")
  async delete(
    @Param("id") id: string,
  ) {
    return this.orderService.delete(id);
  }
}