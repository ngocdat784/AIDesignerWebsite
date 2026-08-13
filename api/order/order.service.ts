import {
  Injectable,
  Inject,
  NotFoundException,
} from "@nestjs/common";

import { OrderServiceInterface } from "./interfaces/order.service.interface";
import { OrderRepositoryInterface } from "./interfaces/order.repository.interface";

import {
  CreateOrderDto,
  OrderStatus,
} from "./dto/create-order.dto";

import { UpdateOrderDto } from "./dto/update-order.dto";

import { ORDER_REPOSITORY } from "../common/constants/repository.tokens";

@Injectable()
export class OrderService implements OrderServiceInterface {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  // =========================
  // Query
  // =========================

  async getAll() {
    return this.orderRepository.getAll();
  }

  async getById(id: string) {
    const order = await this.orderRepository.getById(id);

    if (!order) {
      throw new NotFoundException(
        `Order with id ${id} not found.`,
      );
    }

    return order;
  }

  async getByUserId(userId: string) {
    return this.orderRepository.getByUserId(userId);
  }

  async getByStatus(status: OrderStatus) {
    return this.orderRepository.getByStatus(status);
  }

  // =========================
  // Create
  // =========================

  async create(dto: CreateOrderDto) {
    /*
     * Không bắt Prisma exception ở đây.
     *
     * ID Order bị trùng:
     *
     * P2002
     *   ↓
     * OrderRepository
     *   ↓
     * handlePrismaException()
     *   ↓
     * ConflictException
     *
     *
     * User không tồn tại:
     *
     * P2003
     *   ↓
     * OrderRepository
     *   ↓
     * handlePrismaException()
     *   ↓
     * BadRequestException
     */

    return this.orderRepository.create(dto);
  }

  // =========================
  // Update
  // =========================

  async update(
    id: string,
    dto: UpdateOrderDto,
  ) {
    /*
     * Kiểm tra Order tồn tại trước khi update.
     */
    await this.getById(id);

    return this.orderRepository.update(id, dto);
  }

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    /*
     * Kiểm tra Order tồn tại trước khi delete.
     */
    await this.getById(id);

    return this.orderRepository.delete(id);
  }
}