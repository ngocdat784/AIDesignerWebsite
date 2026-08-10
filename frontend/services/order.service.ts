import { orderRepository } from "@/repositories/order.repository";

import type { CheckoutData } from "@/types/checkout";

import type { CreateOrderRequest } from "@/types/order/order-request";

import type {
  Order,
  OrderItem,
} from "@/types/order/order";

export const orderService = {
  // =========================
  // Query
  // =========================

  getAll(): Order[] {
    return orderRepository.getAll();
  },

  getById(orderId: string): Order | null {
    return orderRepository.getById(orderId);
  },

  getByUserId(userId: string): Order[] {
    return orderRepository.getByUserId(userId);
  },

  // =========================
  // Checkout → Order
  // =========================

  createFromCheckout(
    checkout: CheckoutData,
    userId: string
  ): Order | null {
    if (
      !checkout ||
      checkout.order.items.length === 0
    ) {
      return null;
    }

    const request =
      this.toCreateOrderRequest(checkout);

    return this.create(request, userId);
  },

  // =========================
  // CheckoutData
  // → CreateOrderRequest
  // =========================

  toCreateOrderRequest(
    checkout: CheckoutData
  ): CreateOrderRequest {
    return {
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

      payment:
        checkout.payment.method,

      items:
        checkout.order.items.map(
          (item) => ({
            productId:
              item.template.id,

            productName:
              item.template.title,

            unitPrice:
              item.template.price,

            originalPrice:
              item.template.originalPrice,

            quantity:
              item.quantity,
          })
        ),
    };
  },

  // =========================
  // Create Order
  // =========================

  create(
    request: CreateOrderRequest,
    userId: string
  ): Order {
    const now =
      new Date().toISOString();

    const orderId =
      this.generateOrderId();

    // =========================
    // Create Order Items
    // =========================

    const items: OrderItem[] =
      request.items.map(
        (item) => ({
          id:
            this.generateOrderItemId(),

          orderId,

          productId:
            item.productId,

          productName:
            item.productName,

          unitPrice:
            item.unitPrice,

          quantity:
            item.quantity,

          subtotal:
            item.unitPrice *
            item.quantity,
        })
      );

    // =========================
    // Calculate Order
    // =========================

    const subtotal =
      items.reduce(
        (sum, item) =>
          sum + item.subtotal,
        0
      );

    /*
     * Discount hiện tại được
     * tính từ product snapshot.
     *
     * Khi chuyển sang NestJS +
     * Prisma, backend sẽ tính /
     * xác thực lại discount.
     */
    const checkoutDiscount =
      this.calculateDiscount(request);

    const discount =
      Math.min(
        checkoutDiscount,
        subtotal
      );

    const total =
      subtotal - discount;

    // =========================
    // Create Order
    // =========================

    const order: Order = {
      id: orderId,

      userId,

      status: "PENDING",

      paymentMethod:
        request.payment,

      subtotal,

      discount,

      total,

      billing: {
        ...request.billing,
      },

      items,

      createdAt: now,

      updatedAt: now,
    };

    return orderRepository.create(
      order
    );
  },

  // =========================
  // Discount
  // =========================

  calculateDiscount(
    request: CreateOrderRequest
  ): number {
    return request.items.reduce(
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

        return (
          sum +
          Math.max(
            0,
            discountPerItem
          ) *
            item.quantity
        );
      },
      0
    );
  },

  // =========================
  // Update
  // =========================

  update(
    orderId: string,
    updates: Partial<Order>
  ): Order | null {
    return orderRepository.update(
      orderId,
      updates
    );
  },

  // =========================
  // Delete
  // =========================

  delete(orderId: string): boolean {
    return orderRepository.delete(
      orderId
    );
  },

  // =========================
  // Clear
  // =========================

  clear(): void {
    orderRepository.clear();
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