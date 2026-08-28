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

import {
  ORDER_REPOSITORY,
  TEMPLATE_REPOSITORY,
} from "../common/constants/repository.tokens";

import { TemplateRepositoryInterface } from "../template/interfaces/template.repository.interface";

@Injectable()
export class OrderService implements OrderServiceInterface {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryInterface,

    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: TemplateRepositoryInterface,
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
   * Frontend chỉ gửi:
   *
   * - paymentMethod
   * - billing
   * - items.productId
   * - items.quantity
   * - items.styleId
   *
   * Backend tự quyết định:
   *
   * - id
   * - userId
   * - status
   * - productName
   * - unitPrice
   * - subtotal
   * - discount
   * - total
   * - item.id
   * - styleId
   * - styleSlug
   * - styleName
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

    const items = await Promise.all(
      dto.items.map(
        async (item) => {
          // =====================================
          // Get Template
          // =====================================

          const template =
            await this.templateRepository.getById(
              item.productId,
            );

          if (!template) {
            throw new NotFoundException(
              `Template with id ${item.productId} not found.`,
            );
          }

          // =====================================
          // Get Price From Database
          // =====================================

          /*
           * KHÔNG lấy unitPrice từ frontend.
           *
           * Frontend chỉ gửi productId + quantity.
           *
           * Backend lấy giá hiện tại
           * của Template từ database.
           */

          const unitPrice =
            template.discountPrice ??
            template.price;

          // =====================================
          // Validate Price
          // =====================================

          if (
            unitPrice === null ||
            unitPrice === undefined ||
            !Number.isFinite(unitPrice) ||
            unitPrice < 0
          ) {
            throw new ForbiddenException(
              `Template ${item.productId} has an invalid price.`,
            );
          }

          // =====================================
          // Calculate Item Subtotal
          // =====================================

          const subtotal =
            unitPrice *
            item.quantity;

          // =====================================
          // Snapshot Style
          // =====================================

          let styleId: string | null =
            null;

          let styleSlug: string | null =
            null;

          let styleName: string | null =
            null;

          // -------------------------------------
          // 1. Frontend có chọn style
          // -------------------------------------

          if (item.styleId) {
            const style =
              await this.templateRepository.getStyleById(
                item.styleId,
              );

            if (!style) {
              throw new NotFoundException(
                `Template style with id ${item.styleId} not found.`,
              );
            }

            styleId =
              style.id;

            styleSlug =
              style.slug;

            styleName =
              style.name;
          }

          // -------------------------------------
          // 2. Không chọn style
          //    → dùng style mặc định của Template
          // -------------------------------------

          else if (template.styleId) {
            const style =
              await this.templateRepository.getStyleById(
                template.styleId,
              );

            if (style) {
              styleId =
                style.id;

              styleSlug =
                style.slug;

              styleName =
                style.name;
            }
          }

          // =====================================
          // Return OrderItem
          // =====================================

          return {
            id: crypto.randomUUID(),

            orderId,

            productId:
              item.productId,

            productName:
              template.title,

            // =========================
            // Style Snapshot
            // =========================

            styleId,

            styleSlug,

            styleName,

            // =========================
            // Pricing
            // =========================

            unitPrice,

            quantity:
              item.quantity,

            subtotal,
          };
        },
      ),
    );

    // =========================
    // Calculate Subtotal
    // =========================

    const subtotal =
      items.reduce(
        (sum, item) =>
          sum + item.subtotal,
        0,
      );

    // =========================
    // Calculate Discount
    // =========================

    /*
     * Giá đã sử dụng:
     *
     * discountPrice ?? price
     *
     * nên hiện tại không cần
     * tính thêm discount.
     *
     * Nếu sau này muốn lưu số tiền
     * discount riêng thì có thể:
     *
     * originalPrice - discountPrice
     *
     * và lấy hoàn toàn từ database.
     */

    const discount = 0;

    // =========================
    // Calculate Total
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

      // =========================
      // User
      // =========================

      userId:
        user.id,

      // =========================
      // Status
      // =========================

      status:
        OrderStatus.PENDING,

      // =========================
      // Payment
      // =========================

      paymentMethod:
        dto.paymentMethod,

      // =========================
      // Pricing
      // =========================

      subtotal,

      discount,

      total,

      // =========================
      // Billing
      // =========================

      billing: {
        ...dto.billing,
      },

      // =========================
      // Items
      // =========================

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
      await this.orderRepository.getById(
        id,
      );

    if (!order) {
      throw new NotFoundException(
        `Order with id ${id} not found.`,
      );
    }

    return order;
  }
}