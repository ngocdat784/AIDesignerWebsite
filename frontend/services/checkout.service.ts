import { checkoutRepository } from "@/repositories/checkout.repository";
import { cartService } from "@/services/cart.service";

import type {
  CheckoutBillingInfo,
  CheckoutData,
  CheckoutItem,
  CheckoutPaymentInfo,
} from "@/types/checkout";

export const checkoutService = {
  // =========================
  // Query
  // =========================

  getCheckout(): CheckoutData | null {
    return checkoutRepository.getCheckout();
  },

  getItems(): CheckoutItem[] {
    const checkout = checkoutRepository.getCheckout();

    return checkout?.order.items ?? [];
  },

  getBilling(): CheckoutBillingInfo | null {
    const checkout = checkoutRepository.getCheckout();

    return checkout?.billing ?? null;
  },

  getPayment(): CheckoutPaymentInfo | null {
    const checkout = checkoutRepository.getCheckout();

    return checkout?.payment ?? null;
  },

  // =========================
  // Initialization
  // =========================
  // Cart chỉ được đọc DUY NHẤT tại đây.
  //
  // Cart
  //   ↓
  // CheckoutData snapshot
  //
  // Sau bước này Checkout không phụ thuộc Cart nữa.

  initializeFromCart(): CheckoutData | null {
    const cartItems = cartService.getAll();

    if (!cartItems || cartItems.length === 0) {
      return null;
    }

    const existingCheckout =
      checkoutRepository.getCheckout();

    const items: CheckoutItem[] = cartItems.map(
      (item) => ({
        template: item.template,
        quantity: item.quantity,
      })
    );

    const subtotal = items.reduce(
      (sum, item) =>
        sum +
        item.template.price *
          item.quantity,
      0
    );

    const discount = items.reduce(
      (sum, item) => {
        const originalPrice =
          item.template.originalPrice;

        if (!originalPrice) {
          return sum;
        }

        return (
          sum +
          (originalPrice -
            item.template.price) *
            item.quantity
        );
      },
      0
    );

    const total =
      subtotal - discount;

    const checkout: CheckoutData = {
      billing:
        existingCheckout?.billing ?? {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          country: "",
          postalCode: "",
        },

      payment:
        existingCheckout?.payment ?? {
          method: "card",
        },

      order: {
        items,
        subtotal,
        discount,
        total,
      },
    };

    checkoutRepository.saveCheckout(
      checkout
    );

    return checkout;
  },

  // =========================
  // Billing
  // =========================

  updateBilling(
    billing: CheckoutBillingInfo
  ): CheckoutData | null {
    const checkout =
      checkoutRepository.getCheckout();

    if (!checkout) {
      return null;
    }

    const updated: CheckoutData = {
      ...checkout,
      billing,
    };

    checkoutRepository.saveCheckout(
      updated
    );

    return updated;
  },

  // =========================
  // Payment
  // =========================

  updatePayment(
    payment: CheckoutPaymentInfo
  ): CheckoutData | null {
    const checkout =
      checkoutRepository.getCheckout();

    if (!checkout) {
      return null;
    }

    const updated: CheckoutData = {
      ...checkout,
      payment,
    };

    checkoutRepository.saveCheckout(
      updated
    );

    return updated;
  },

  // =========================
  // Calculations
  // =========================

  getSubtotal(): number {
    const checkout =
      checkoutRepository.getCheckout();

    if (!checkout) {
      return 0;
    }

    return checkout.order.items.reduce(
      (sum, item) =>
        sum +
        item.template.price *
          item.quantity,
      0
    );
  },

  getDiscount(): number {
    const checkout =
      checkoutRepository.getCheckout();

    if (!checkout) {
      return 0;
    }

    return checkout.order.items.reduce(
      (sum, item) => {
        const originalPrice =
          item.template.originalPrice;

        if (!originalPrice) {
          return sum;
        }

        return (
          sum +
          (originalPrice -
            item.template.price) *
            item.quantity
        );
      },
      0
    );
  },

  getTotal(): number {
    const subtotal =
      this.getSubtotal();

    const discount =
      this.getDiscount();

    return subtotal - discount;
  },

  // =========================
  // Order Summary
  // =========================

  getOrderSummary() {
    const checkout =
      checkoutRepository.getCheckout();

    if (!checkout) {
      return null;
    }

    return {
      items: checkout.order.items,

      subtotal:
        checkout.order.subtotal,

      discount:
        checkout.order.discount,

      total:
        checkout.order.total,
    };
  },

  // =========================
  // Validation
  // =========================

  validateBilling(): boolean {
    const billing =
      this.getBilling();

    if (!billing) {
      return false;
    }

    return Boolean(
      billing.firstName.trim() &&
        billing.lastName.trim() &&
        billing.email.trim() &&
        billing.phone.trim() &&
        billing.address.trim() &&
        billing.city.trim() &&
        billing.country.trim() &&
        billing.postalCode.trim()
    );
  },

  validatePayment(): boolean {
    const payment =
      this.getPayment();

    if (!payment) {
      return false;
    }

    return Boolean(
      payment.method
    );
  },

  validateCheckout(): boolean {
    const checkout =
      checkoutRepository.getCheckout();

    if (!checkout) {
      return false;
    }

    // Không đọc Cart ở đây.
    if (
      checkout.order.items.length === 0
    ) {
      return false;
    }

    if (!this.validateBilling()) {
      return false;
    }

    if (!this.validatePayment()) {
      return false;
    }

    return true;
  },

  // =========================
  // Order
  // =========================

  createOrder(): CheckoutData | null {
    if (!this.validateCheckout()) {
      return null;
    }

    const checkout =
      checkoutRepository.getCheckout();

    if (!checkout) {
      return null;
    }

    const orderSummary =
      this.getOrderSummary();

    if (!orderSummary) {
      return null;
    }

    const order: CheckoutData = {
      ...checkout,

      order: {
        ...orderSummary,
      },
    };

    return order;
  },

  // =========================
  // Commands
  // =========================

  clear(): void {
    checkoutRepository.clearCheckout();
  },

  hasCheckout(): boolean {
    return checkoutRepository.hasCheckout();
  },
};