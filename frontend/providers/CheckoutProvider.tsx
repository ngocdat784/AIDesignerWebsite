"use client";

import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import { CheckoutContext } from "@/contexts/CheckoutContext";
import { checkoutService } from "@/services/checkout.service";

import type {
  CheckoutBillingInfo,
  CheckoutContextType,
  CheckoutData,
  CheckoutPaymentInfo,
} from "@/types/checkout";

interface Props {
  children: ReactNode;
}

export default function CheckoutProvider({
  children,
}: Props) {
  const [checkout, setCheckout] =
    useState<CheckoutData | null>(null);

  // =========================
  // Refresh
  // =========================

  function refresh() {
    const data =
      checkoutService.getCheckout();

    setCheckout(data);
  }

  // =========================
  // Initialize
  // =========================

  function initialize() {
    const data =
      checkoutService.initializeFromCart();

    if (!data) {
      setCheckout(null);
      return;
    }

    setCheckout(data);
  }

  // =========================
  // Initial Load
  // =========================

  useEffect(() => {
    initialize();

    function handleStorage() {
      refresh();
    }

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  // =========================
  // Billing
  // =========================

  function updateBilling(
    billing: CheckoutBillingInfo
  ): void {
    const updated =
      checkoutService.updateBilling(
        billing
      );

    setCheckout(updated);

    if (updated) {
      toast.success(
        "Billing information updated."
      );
    }
  }

  // =========================
  // Payment
  // =========================

  function updatePayment(
    payment: CheckoutPaymentInfo
  ): void {
    const updated =
      checkoutService.updatePayment(
        payment
      );

    setCheckout(updated);

    if (updated) {
      toast.success(
        "Payment method updated."
      );
    }
  }

  // =========================
  // Validation
  // =========================

  function validateBilling() {
    return checkoutService.validateBilling();
  }

  function validatePayment() {
    return checkoutService.validatePayment();
  }

  function validateCheckout() {
    return checkoutService.validateCheckout();
  }

  // =========================
  // Order
  // =========================

  function createOrder() {
    const valid =
      checkoutService.validateCheckout();

    if (!valid) {
      toast.error(
        "Please complete your checkout information."
      );

      return null;
    }

    const order =
      checkoutService.createOrder();

    if (!order) {
      toast.error(
        "Unable to create order."
      );

      return null;
    }

    toast.success(
      "Order created successfully."
    );

    return order;
  }

  // =========================
  // Clear
  // =========================

  function clear() {
    checkoutService.clear();

    setCheckout(null);

    toast.success(
      "Checkout cleared."
    );
  }

  // =========================
  // Derived Data
  // =========================

  const items =
    checkout?.order.items ?? [];

  const subtotal =
    checkout?.order.subtotal ?? 0;

  const discount =
    checkout?.order.discount ?? 0;

  const total =
    checkout?.order.total ?? 0;

  // =========================
  // Context Value
  // =========================

  const value: CheckoutContextType = useMemo(
  () => ({
    checkout,

    items,

    billing:
      checkout?.billing ?? null,

    payment:
      checkout?.payment ?? null,

    subtotal,
    discount,
    total,

    initialize,
    refresh,

    updateBilling,
    updatePayment,

    validateBilling,
    validatePayment,
    validateCheckout,

    createOrder,
    clear,
  }),
  [
    checkout,
    items,
    subtotal,
    discount,
    total,
  ]
);

  return (
    <CheckoutContext.Provider
      value={value}
    >
      {children}
    </CheckoutContext.Provider>
  );
}