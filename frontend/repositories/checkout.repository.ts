import type { CheckoutData } from "@/types/checkout";

const CHECKOUT_STORAGE_KEY = "ai-designer-checkout";

class CheckoutRepository {
  /**
   * Lấy toàn bộ dữ liệu checkout
   */
  getCheckout(): CheckoutData | null {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const data = localStorage.getItem(
        CHECKOUT_STORAGE_KEY
      );

      if (!data) {
        return null;
      }

      return JSON.parse(data) as CheckoutData;
    } catch (error) {
      console.error(
        "Failed to get checkout data:",
        error
      );

      return null;
    }
  }

  /**
   * Lưu toàn bộ dữ liệu checkout
   */
  saveCheckout(
    checkout: CheckoutData
  ): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      localStorage.setItem(
        CHECKOUT_STORAGE_KEY,
        JSON.stringify(checkout)
      );
    } catch (error) {
      console.error(
        "Failed to save checkout data:",
        error
      );
    }
  }

  /**
   * Cập nhật một phần dữ liệu checkout
   */
  updateCheckout(
    updates: Partial<CheckoutData>
  ): CheckoutData | null {
    const current = this.getCheckout();

    if (!current) {
      return null;
    }

    const updated: CheckoutData = {
      ...current,
      ...updates,
    };

    this.saveCheckout(updated);

    return updated;
  }

  /**
   * Xóa toàn bộ dữ liệu checkout
   */
  clearCheckout(): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      localStorage.removeItem(
        CHECKOUT_STORAGE_KEY
      );
    } catch (error) {
      console.error(
        "Failed to clear checkout data:",
        error
      );
    }
  }

  /**
   * Kiểm tra checkout có tồn tại hay không
   */
  hasCheckout(): boolean {
    return this.getCheckout() !== null;
  }
}

export const checkoutRepository =
  new CheckoutRepository();