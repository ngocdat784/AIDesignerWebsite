import { orderRepository } from "@/repositories/order.repository";

import type { CheckoutData } from "@/types/checkout";

import type {
  CreateOrderData,
  Order,
  OrderItem,
  OrderPaymentMethod,
  OrderStatus,
  UpdateOrderData,
} from "@/types/order/order";

// =========================
// Order Service
// =========================

export const orderService = {
  // =========================
  // Query
  // =========================

  async getAll(): Promise<Order[]> {
    return orderRepository.getAll();
  },

  async getById(
    orderId: string,
  ): Promise<Order | null> {
    return orderRepository.getById(
      orderId,
    );
  },

  async getByUserId(
    userId: string,
  ): Promise<Order[]> {
    return orderRepository.getByUserId(
      userId,
    );
  },

  async getByStatus(
    status: OrderStatus,
  ): Promise<Order[]> {
    return orderRepository.getByStatus(
      status,
    );
  },

  // =========================
  // Checkout → Order
  // =========================
  //
  // Chuyển dữ liệu CheckoutData
  // thành payload mà backend
  // POST /orders yêu cầu.
  // =========================

  async createFromCheckout(
    checkout: CheckoutData,
    userId: string,
  ): Promise<Order> {
    if (
      !checkout ||
      checkout.order.items.length === 0
    ) {
      throw new Error(
        "Cannot create an order with an empty cart.",
      );
    }

    const data =
      this.toCreateOrderData(
        checkout,
        userId,
      );

    return this.create(data);
  },

  // =========================
  // CheckoutData
  // → CreateOrderData
  // =========================

  toCreateOrderData(
    checkout: CheckoutData,
    userId: string,
  ): CreateOrderData {
    const items: OrderItem[] =
      checkout.order.items.map(
        (item) => {
          const unitPrice =
            item.template.discountPrice ??
            item.template.price;

          const originalPrice =
            item.template.originalPrice ??
            undefined;

          return {
            id:
              this.generateOrderItemId(),

            orderId:
              "",

            productId:
              item.template.id,

            productName:
              item.template.title,

            unitPrice,

            originalPrice,

            quantity:
              item.quantity,

            subtotal:
              unitPrice *
              item.quantity,
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

    const discount =
      Math.min(
        this.calculateDiscount(
          items,
        ),
        subtotal,
      );

    // =========================
    // Calculate total
    // =========================

    const total =
      subtotal - discount;

    // =========================
    // Backend payment method
    // =========================

    const paymentMethod =
      this.mapPaymentMethod(
        checkout.payment.method,
      );

    return {
      id:
        this.generateOrderId(),

      /*
       * Backend OrderService sẽ
       * thay userId này bằng:
       *
       * user.id
       *
       * lấy từ JWT.
       *
       * Tuy nhiên CreateOrderDto
       * hiện tại vẫn yêu cầu field này.
       */
      userId,

      status: "PENDING",

      paymentMethod,

      subtotal,

      discount,

      total,

      billing: {
        firstName:
          checkout.billing.firstName,

        lastName:
          checkout.billing.lastName,

        email:
          checkout.billing.email,

        phone:
          checkout.billing.phone,

        address:
          checkout.billing.address,

        city:
          checkout.billing.city,

        country:
          checkout.billing.country,

        postalCode:
          checkout.billing.postalCode,
      },

      items,
    };
  },

  // =========================
  // Payment Method Mapper
  // =========================
  //
  // Backend:
  //
  // card
  // paypal
  // bank
  //
  // Nếu CheckoutData đang dùng
  // đúng các giá trị này thì
  // giữ nguyên.
  // =========================

  mapPaymentMethod(
    method: string,
  ): OrderPaymentMethod {
    switch (method) {
      case "card":
        return "card";

      case "paypal":
        return "paypal";

      case "bank":
        return "bank";

      default:
        throw new Error(
          `Unsupported payment method: ${method}`,
        );
    }
  },

  // =========================
  // Create
  // =========================
  //
  // POST /orders
  // =========================

  async create(
    data: CreateOrderData,
  ): Promise<Order> {
    return orderRepository.create(
      data,
    );
  },

  // =========================
  // Discount
  // =========================

  calculateDiscount(
    items: OrderItem[],
  ): number {
    return items.reduce(
      (sum, item) => {
        if (
          item.originalPrice ===
          undefined
        ) {
          return sum;
        }

        const discountPerItem =
          item.originalPrice -
          item.unitPrice;

        if (
          discountPerItem <= 0
        ) {
          return sum;
        }

        return (
          sum +
          discountPerItem *
            item.quantity
        );
      },
      0,
    );
  },

  // =========================
  // Update
  // =========================
  //
  // PATCH /orders/:id
  //
  // ADMIN ONLY
  // =========================

  async update(
    orderId: string,
    updates: UpdateOrderData,
  ): Promise<Order> {
    return orderRepository.update(
      orderId,
      updates,
    );
  },

  // =========================
  // Delete
  // =========================
  //
  // DELETE /orders/:id
  //
  // ADMIN ONLY
  // =========================

  async delete(
    orderId: string,
  ): Promise<Order> {
    return orderRepository.delete(
      orderId,
    );
  },

  // =========================
  // Helpers
  // =========================

  generateOrderId(): string {
    return `order-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
  },

  generateOrderItemId(): string {
    return `order-item-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
  },
};