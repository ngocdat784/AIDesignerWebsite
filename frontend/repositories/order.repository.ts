import type { Order } from "@/types/order/order";

const ORDER_STORAGE_KEY = "ai-designer-orders";

class OrderRepository {
  // =========================
  // Query
  // =========================

  /**
   * Lấy toàn bộ orders
   */
  getAll(): Order[] {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const data =
        localStorage.getItem(
          ORDER_STORAGE_KEY
        );

      if (!data) {
        return [];
      }

      return JSON.parse(data) as Order[];
    } catch (error) {
      console.error(
        "Failed to get orders:",
        error
      );

      return [];
    }
  }

  /**
   * Lấy order theo ID
   */
  getById(
    orderId: string
  ): Order | null {
    return (
      this.getAll().find(
        (order) =>
          order.id === orderId
      ) ?? null
    );
  }

  /**
   * Lấy orders của user
   */
  getByUserId(
    userId: string
  ): Order[] {
    return this.getAll().filter(
      (order) =>
        order.userId === userId
    );
  }

  /**
   * Kiểm tra order tồn tại
   */
  hasOrder(
    orderId: string
  ): boolean {
    return (
      this.getById(orderId) !== null
    );
  }

  // =========================
  // Commands
  // =========================

  /**
   * Tạo order
   */
  create(order: Order): Order {
    const orders =
      this.getAll();

    orders.push(order);

    this.saveAll(orders);

    return order;
  }

  /**
   * Cập nhật order
   */
  update(
    orderId: string,
    updates: Partial<Order>
  ): Order | null {
    const orders =
      this.getAll();

    const index =
      orders.findIndex(
        (order) =>
          order.id === orderId
      );

    if (index === -1) {
      return null;
    }

    const updated: Order = {
      ...orders[index],
      ...updates,
      updatedAt:
        new Date().toISOString(),
    };

    orders[index] = updated;

    this.saveAll(orders);

    return updated;
  }

  /**
   * Xóa order
   */
  delete(
    orderId: string
  ): boolean {
    const orders =
      this.getAll();

    const filtered =
      orders.filter(
        (order) =>
          order.id !== orderId
      );

    if (
      filtered.length ===
      orders.length
    ) {
      return false;
    }

    this.saveAll(filtered);

    return true;
  }

  // =========================
  // Storage
  // =========================

  /**
   * Lưu toàn bộ orders
   */
  private saveAll(
    orders: Order[]
  ): void {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    try {
      localStorage.setItem(
        ORDER_STORAGE_KEY,
        JSON.stringify(orders)
      );
    } catch (error) {
      console.error(
        "Failed to save orders:",
        error
      );
    }
  }

  /**
   * Xóa toàn bộ orders
   */
  clear(): void {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    try {
      localStorage.removeItem(
        ORDER_STORAGE_KEY
      );
    } catch (error) {
      console.error(
        "Failed to clear orders:",
        error
      );
    }
  }
}

export const orderRepository =
  new OrderRepository();