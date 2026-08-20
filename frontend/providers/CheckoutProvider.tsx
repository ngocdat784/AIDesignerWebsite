"use client";

import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import { CheckoutContext } from "@/contexts/CheckoutContext";
import { checkoutService } from "@/services/checkout.service";
import { orderService } from "@/services/order.service";

import type {
  CheckoutBillingInfo,
  CheckoutContextType,
  CheckoutData,
  CheckoutPaymentInfo,
} from "@/types/checkout";

import type { Order } from "@/types/order/order";

interface Props {
  children: ReactNode;
}

export default function CheckoutProvider({
  children,
}: Props) {
  const auth = useAuth();

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
      handleStorage,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage,
      );
    };
  }, []);

  // =========================
  // Billing
  // =========================

  function updateBilling(
    billing: CheckoutBillingInfo,
  ): void {
    const updated =
      checkoutService.updateBilling(
        billing,
      );

    setCheckout(updated);

    if (updated) {
      toast.success(
        "Billing information updated.",
      );
    }
  }

  // =========================
  // Payment
  // =========================

  function updatePayment(
    payment: CheckoutPaymentInfo,
  ): void {
    const updated =
      checkoutService.updatePayment(
        payment,
      );

    setCheckout(updated);

    if (updated) {
      toast.success(
        "Payment method updated.",
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

  async function createOrder(): Promise<Order | null> {
    // =========================
    // Debug
    // =========================

    console.log(
      "========== CHECKOUT AUTH DEBUG ==========",
    );

    console.log(
      "auth.user:",
      auth.user,
    );

    console.log(
      "auth.user?.id:",
      auth.user?.id,
    );

    console.log(
      "auth.user?.email:",
      auth.user?.email,
    );

    console.log(
      "auth.user?.role:",
      auth.user?.role,
    );

    console.log(
      "auth.isAuthenticated:",
      auth.isAuthenticated,
    );

    console.log(
      "auth.isLoading:",
      auth.isLoading,
    );

    console.log(
      "accessToken:",
      typeof window !== "undefined"
        ? localStorage.getItem(
            "accessToken",
          )
        : null,
    );

    console.log(
      "checkout:",
      checkout,
    );

    console.log(
      "=========================================",
    );

    // =========================
    // Validate Checkout
    // =========================

    const valid =
      checkoutService.validateCheckout();

    if (!valid) {
      toast.error(
        "Please complete your checkout information.",
      );

      return null;
    }

    // =========================
    // Check Checkout
    // =========================

    if (!checkout) {
      toast.error(
        "No checkout data available.",
      );

      return null;
    }

    // =========================
    // Authentication
    // =========================

    /*
     * AuthProvider restore session
     * là một quá trình async.
     *
     * Vì vậy có thể xảy ra trường hợp:
     *
     * accessToken có tồn tại
     * nhưng auth.user vẫn đang null.
     *
     * Khi đó thử restore session lại.
     */

    let currentUser = auth.user;

    if (!currentUser?.id) {
      console.log(
        "AUTH: user missing, attempting to restore session...",
      );

      try {
        currentUser =
          await auth.refreshUser();

        console.log(
          "AUTH: restored user:",
          currentUser,
        );
      } catch (error) {
        console.error(
          "AUTH: failed to restore session:",
          error,
        );

        currentUser = null;
      }
    }

    // =========================
    // Authentication Failed
    // =========================

    if (!currentUser?.id) {
      console.error(
        "AUTH ERROR: Unable to restore authenticated user.",
      );

      toast.error(
        "You must be logged in to create an order.",
      );

      return null;
    }

    // =========================
    // Create Order
    // =========================

    try {
      console.log(
        "Creating order for user:",
        currentUser.id,
      );

      const order =
        await orderService.createFromCheckout(
          checkout,
          currentUser.id,
        );

      console.log(
        "Order created:",
        order,
      );

      toast.success(
        "Order created successfully.",
      );

      // =========================
      // Clear Checkout
      // =========================

      clear();

      return order;
    } catch (error) {
      console.error(
        "CREATE ORDER ERROR:",
        error,
      );

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to create order.";

      toast.error(errorMessage);

      return null;
    }
  }

  // =========================
  // Clear
  // =========================

  function clear() {
    checkoutService.clear();

    setCheckout(null);

    toast.success(
      "Checkout cleared.",
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

  const value: CheckoutContextType =
    useMemo(
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
        auth.user,
      ],
    );

  return (
    <CheckoutContext.Provider
      value={value}
    >
      {children}
    </CheckoutContext.Provider>
  );
}