import { Injectable, Inject } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class OrderRepository {
  constructor(
    @Inject(DatabaseService)
    private database: DatabaseService,
  ) {
    console.log("OrderRepository constructor");

    if (!this.database) {
      console.log(
        "DatabaseService not injected — creating fallback instance.",
      );

      // Fallback cho test script khi DI metadata không được resolve
      this.database = new DatabaseService();
    }

    console.log("database =", this.database);
    console.log("database.order =", this.database?.order);
  }

  // =========================
  // Query
  // =========================

  async getAll() {
    return this.database.order.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: true,
        billing: true,
        items: true,
      },
    });
  }

  async getById(id: string) {
    return this.database.order.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
        billing: true,
        items: true,
      },
    });
  }

  async getByUserId(userId: string) {
    return this.database.order.findMany({
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
    return this.database.order.findMany({
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
    return this.database.order.create({
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
    return this.database.order.update({
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
  }

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    return this.database.order.delete({
      where: {
        id,
      },
    });
  }
}