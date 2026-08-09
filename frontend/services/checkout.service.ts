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
    return (
      checkoutRepository
        .getCheckout()
        ?.order.items ?? []
    );
  },

  getBilling(): CheckoutBillingInfo | null {
    return (
      checkoutRepository
        .getCheckout()
        ?.billing ?? null
    );
  },

  getPayment(): CheckoutPaymentInfo | null {
    return (
      checkoutRepository
        .getCheckout()
        ?.payment ?? null
    );
  },

  // =========================
  // Initialization
  // =========================

  initializeFromCart(): CheckoutData | null {
    const cartItems = cartService.getAll();

    if (
      !cartItems ||
      cartItems.length === 0
    ) {
      return null;
    }

    const existingCheckout =
      checkoutRepository.getCheckout();

    const items: CheckoutItem[] =
      cartItems.map((item) => ({
        template: item.template,
        quantity: item.quantity,
      }));

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
        subtotal: this.getSubtotal(items),
        discount: this.getDiscount(),
        total: this.getTotal(),
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

  getSubtotal(
    items?: CheckoutItem[]
  ): number {
    const checkoutItems =
      items ?? this.getItems();

    return checkoutItems.reduce(
      (sum, item) =>
        sum +
        item.template.price *
          item.quantity,
      0
    );
  },

  getDiscount(): number {
    return cartService.getDiscount();
  },

  getTotal(): number {
    return cartService.getTotal();
  },

  getOrderSummary() {
    const items = this.getItems();

    return {
      items,
      subtotal:
        cartService.getSubtotal(),
      discount:
        cartService.getDiscount(),
      total:
        cartService.getTotal(),
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
    const cartItems =
      cartService.getAll();

    if (
      !cartItems ||
      cartItems.length === 0
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

    const order: CheckoutData = {
      ...checkout,
      order: orderSummary,
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