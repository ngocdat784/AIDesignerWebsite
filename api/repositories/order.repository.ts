import { prisma } from "../lib/prisma";

export const orderRepository = {
  // =========================
  // Query
  // =========================

  async getAll() {
    return prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: true,
        billing: true,
        items: true,
      },
    });
  },

  async getById(id: string) {
    return prisma.order.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
        billing: true,
        items: true,
      },
    });
  },

  async getByUserId(userId: string) {
    return prisma.order.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        billing: true,
        items: true,
      },
    });
  },

  async getByStatus(
    status:
      | "PENDING"
      | "PAID"
      | "PROCESSING"
      | "COMPLETED"
      | "CANCELLED"
      | "FAILED"
  ) {
    return prisma.order.findMany({
      where: {
        status,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        billing: true,
        items: true,
      },
    });
  },

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
    return prisma.order.create({
      data: {
        id: data.id,
        userId: data.userId,

        status: data.status ?? "PENDING",

        paymentMethod: data.paymentMethod,

        subtotal: data.subtotal,
        discount: data.discount,
        total: data.total,

        billing: {
          create: data.billing,
        },

        items: {
          create: data.items,
        },
      },

      include: {
        billing: true,
        items: true,
        user: true,
      },
    });
  },

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
    }
  ) {
    return prisma.order.update({
      where: {
        id,
      },

      data,

      include: {
        billing: true,
        items: true,
        user: true,
      },
    });
  },

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    return prisma.order.delete({
      where: {
        id,
      },
    });
  },
};