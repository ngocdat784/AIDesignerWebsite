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

  // ADMIN: xem tất cả Order
  async getAll() {
    return this.orderRepository.getAll();
  }

  // USER:
  //   chỉ được xem Order của chính mình
  //
  // ADMIN:
  //   được xem mọi Order
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

    /*
     * CREATOR không nên tới được đây
     * vì Controller đã chặn bằng RoleGuard.
     *
     * Nhưng vẫn giữ kiểm tra ở Service
     * để bảo vệ business logic.
     */
    throw new ForbiddenException(
      "You do not have permission to access this order.",
    );
  }

  // USER:
  //   chỉ được xem Order của chính mình.
  //
  // ADMIN:
  //   được xem Order của bất kỳ user nào.
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
  // ADMIN
  async getByStatus(status: OrderStatus) {
    return this.orderRepository.getByStatus(status);
  }

  // =========================
  // Create
  // =========================

  // USER tạo Order cho chính mình
  async create(
    dto: CreateOrderDto,
    user: CurrentUserPayload,
  ) {
    /*
     * Không tin userId do client gửi lên.
     *
     * JWT
     *   ↓
     * CurrentUserPayload
     *   ↓
     * user.id
     *   ↓
     * Order.userId
     */

    const data = {
      ...dto,
      userId: user.id,
    };

    /*
     * Không bắt Prisma exception ở Service.
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
     * P2003
     *   ↓
     * OrderRepository
     *   ↓
     * handlePrismaException()
     *   ↓
     * BadRequestException
     */

    return this.orderRepository.create(data);
  }

  // =========================
  // Update
  // =========================

  // Chỉ ADMIN
  async update(
    id: string,
    dto: UpdateOrderDto,
  ) {
    /*
     * Kiểm tra Order tồn tại trước khi update.
     */
    await this.getOrderForAdmin(id);

    return this.orderRepository.update(
      id,
      dto,
    );
  }

  // =========================
  // Delete
  // =========================

  // Chỉ ADMIN
  async delete(id: string) {
    /*
     * Kiểm tra Order tồn tại trước khi delete.
     */
    await this.getOrderForAdmin(id);

    return this.orderRepository.delete(id);
  }

  // =========================
  // Internal
  // =========================

  /**
   * Kiểm tra Order tồn tại.
   *
   * Dùng cho các thao tác chỉ ADMIN được phép thực hiện.
   */
  private async getOrderForAdmin(id: string) {
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