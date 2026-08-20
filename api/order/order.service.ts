import {
  ForbiddenException,
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

import { CurrentUserPayload } from "../auth/interfaces/current-user.interface";

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

  /**
   * ADMIN: xem tất cả Order
   */
  async getAll() {
    return this.orderRepository.getAll();
  }

  /**
   * USER:
   *   chỉ được xem Order của chính mình
   *
   * ADMIN:
   *   được xem mọi Order
   */
  async getById(
    id: string,
    user: CurrentUserPayload,
  ) {
    const order =
      await this.orderRepository.getById(id);

    if (!order) {
      throw new NotFoundException(
        `Order with id ${id} not found.`,
      );
    }

    // ADMIN có toàn quyền
    if (user.role === "ADMIN") {
      return order;
    }

    // USER chỉ được xem Order của mình
    if (
      user.role === "USER" &&
      order.userId !== user.id
    ) {
      throw new ForbiddenException(
        "You can only access your own orders.",
      );
    }

    throw new ForbiddenException(
      "You do not have permission to access this order.",
    );
  }

  /**
   * USER:
   *   chỉ được xem Order của chính mình.
   *
   * ADMIN:
   *   được xem Order của bất kỳ user nào.
   */
  async getByUserId(
    userId: string,
    user: CurrentUserPayload,
  ) {
    // ADMIN được xem order của bất kỳ user nào
    if (user.role === "ADMIN") {
      return this.orderRepository.getByUserId(
        userId,
      );
    }

    // USER chỉ được xem order của chính mình
    if (user.role === "USER") {
      if (userId !== user.id) {
        throw new ForbiddenException(
          "You can only access your own orders.",
        );
      }

      return this.orderRepository.getByUserId(
        user.id,
      );
    }

    // CREATOR hoặc role không được phép
    throw new ForbiddenException(
      "You do not have permission to access orders.",
    );
  }

  /**
   * ADMIN: xem Order theo trạng thái
   */
  async getByStatus(status: OrderStatus) {
    return this.orderRepository.getByStatus(
      status,
    );
  }

  // =========================
  // Create
  // =========================

  /**
   * USER tạo Order cho chính mình.
   *
   * Frontend chỉ được gửi:
   * - paymentMethod
   * - billing
   * - items
   *
   * Backend tự quyết định:
   * - id
   * - userId
   * - status
   * - subtotal
   * - discount
   * - total
   * - item.id
   * - item.subtotal
   */
  async create(
    dto: CreateOrderDto,
    user: CurrentUserPayload,
  ) {
    // =========================
    // Validate items
    // =========================

    if (
      !dto.items ||
      dto.items.length === 0
    ) {
      throw new ForbiddenException(
        "Cannot create an order with no items.",
      );
    }

    // =========================
    // Create Order ID
    // =========================

    const orderId =
      crypto.randomUUID();

    // =========================
    // Create Order Items
    // =========================

    const items = dto.items.map(
      (item) => {
        const subtotal =
          item.unitPrice *
          item.quantity;

        return {
          id: crypto.randomUUID(),

          orderId,

          productId:
            item.productId,

          productName:
            item.productName,

          unitPrice:
            item.unitPrice,

          quantity:
            item.quantity,

          subtotal,
        };
      },
    );

    // =========================
    // Calculate subtotal
    // =========================

    const subtotal =
      items.reduce(
        (sum, item) =>
          sum + item.subtotal,
        0,
      );

    // =========================
    // Calculate discount
    // =========================

    /*
     * originalPrice hiện tại chỉ
     * tồn tại ở frontend DTO.
     *
     * Backend CreateOrderItemDto
     * hiện không có originalPrice.
     *
     * Vì vậy tạm thời discount = 0.
     *
     * Sau này nếu backend lấy được
     * product/template từ database,
     * discount nên được tính lại
     * hoàn toàn ở backend.
     */
    const discount = 0;

    // =========================
    // Calculate total
    // =========================

    const total =
      Math.max(
        0,
        subtotal - discount,
      );

    // =========================
    // Create Order Data
    // =========================

    const data = {
      id: orderId,

      /*
       * QUAN TRỌNG:
       *
       * Không lấy userId từ request body.
       *
       * userId phải lấy từ JWT.
       */
      userId: user.id,

      /*
       * Order mới luôn bắt đầu
       * ở trạng thái PENDING.
       */
      status: OrderStatus.PENDING,

      paymentMethod:
        dto.paymentMethod,

      subtotal,

      discount,

      total,

      billing: {
        ...dto.billing,
      },

      items,
    };

    // =========================
    // Repository
    // =========================

    return this.orderRepository.create(
      data,
    );
  }

  // =========================
  // Update
  // =========================

  /**
   * Chỉ ADMIN
   */
  async update(
    id: string,
    dto: UpdateOrderDto,
  ) {
    await this.getOrderForAdmin(id);

    return this.orderRepository.update(
      id,
      dto,
    );
  }

  // =========================
  // Delete
  // =========================

  /**
   * Chỉ ADMIN
   */
  async delete(id: string) {
    await this.getOrderForAdmin(id);

    return this.orderRepository.delete(id);
  }

  // =========================
  // Internal
  // =========================

  /**
   * Kiểm tra Order tồn tại.
   *
   * Dùng cho các thao tác chỉ ADMIN
   * được phép thực hiện.
   */
  private async getOrderForAdmin(
    id: string,
  ) {
    const order =
      await this.orderRepository.getById(id);

    if (!order) {
      throw new NotFoundException(
        `Order with id ${id} not found.`,
      );
    }

    return order;
  }
}