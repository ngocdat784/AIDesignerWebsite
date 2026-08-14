import { CurrentUserPayload } from "../../auth/interfaces/current-user.interface";

export interface OrderServiceInterface {
  // =========================
  // Query
  // =========================

  // Chỉ ADMIN được gọi getAll()
  getAll(): Promise<any[]>;

  // USER: chỉ xem order của mình
  // ADMIN: xem bất kỳ order
  getById(
    id: string,
    user: CurrentUserPayload,
  ): Promise<any | null>;

  // USER: chỉ xem order của mình
  // ADMIN: xem order của user bất kỳ
  getByUserId(
    userId: string,
    user: CurrentUserPayload,
  ): Promise<any[]>;

  // Chỉ ADMIN
  getByStatus(
    status:
      | "PENDING"
      | "PAID"
      | "PROCESSING"
      | "COMPLETED"
      | "CANCELLED"
      | "FAILED",
  ): Promise<any[]>;

  // =========================
  // Create
  // =========================

  // USER tạo order cho chính mình
  create(
    data: {
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
    },
    user: CurrentUserPayload,
  ): Promise<any>;

  // =========================
  // Update
  // =========================

  // Chỉ ADMIN
  update(
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
    },
  ): Promise<any>;

  // =========================
  // Delete
  // =========================

  // Chỉ ADMIN
  delete(
    id: string,
  ): Promise<any>;
}