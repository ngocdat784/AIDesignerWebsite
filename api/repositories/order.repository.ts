import { Injectable, Inject } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { OrderRepositoryInterface } from "../order/interfaces/order.repository.interface";
import { handlePrismaException } from "../common/exceptions/prisma.exception";

@Injectable()
export class OrderRepository
  implements OrderRepositoryInterface
{
  constructor(
    @Inject(DatabaseService)
    private readonly database: DatabaseService,
  ) {}

  // =========================
  // Query
  // =========================

  async getAll() {
    try {
      return await this.database.order.findMany({
        orderBy: {
          createdAt: "desc",
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              email: true,
              role: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          billing: true,
          items: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  async getById(id: string) {
    try {
      return await this.database.order.findUnique({
        where: {
          id,
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              email: true,
              role: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          billing: true,
          items: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  async getByUserId(userId: string) {
    try {
      return await this.database.order.findMany({
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
    } catch (error) {
      handlePrismaException(error);
    }
  }

  async getByStatus(
    status:
      | "PENDING"
      | "PAID"
      | "PROCESSING"
      | "COMPLETED"
      | "CANCELLED"
      | "FAILED",
  ) {
    try {
      return await this.database.order.findMany({
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
    } catch (error) {
      handlePrismaException(error);
    }
  }

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

    paymentMethod: "card" | "paypal" | "bank";

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
    try {
      return await this.database.order.create({
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
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              email: true,
              role: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

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

      paymentMethod?: "card" | "paypal" | "bank";

      subtotal?: number;
      discount?: number;
      total?: number;
    },
  ) {
    try {
      return await this.database.order.update({
        where: {
          id,
        },

        data,

        include: {
          billing: true,
          items: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              email: true,
              role: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    try {
      return await this.database.order.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }
}