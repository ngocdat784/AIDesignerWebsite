export interface OrderRepositoryInterface {
  // =========================
  // Query
  // =========================

  getAll(): Promise<any[]>;

  getById(
    id: string,
  ): Promise<any | null>;

  getByUserId(
    userId: string,
  ): Promise<any[]>;

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
  ): Promise<any>;

  // =========================
  // Update
  // =========================

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

  delete(
    id: string,
  ): Promise<any>;
}