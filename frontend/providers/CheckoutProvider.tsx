"use client";

import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import { CheckoutContext } from "@/contexts/CheckoutContext";

import { checkoutService } from "@/services/checkout.service";
import { orderService } from "@/services/order.service";
import { cartService } from "@/services/cart.service";

import type {
  CheckoutBillingInfo,
  CheckoutContextType,
  CheckoutData,
  CheckoutPaymentInfo,
} from "@/types/checkout";

import type { Order } from "@/types/order/order";

import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

interface Props {
  children: ReactNode;
}

export default function CheckoutProvider({
  children,
}: Props) {
  const auth = useAuth();
  const router = useRouter();

  const [checkout, setCheckout] =
    useState<CheckoutData | null>(null);

  // =========================================================
  // Refresh
  // =========================================================

  function refresh() {
    const data =
      checkoutService.getCheckout();

    setCheckout(data);
  }

  // =========================================================
  // Initialize
  // =========================================================

  function initialize() {
    const data =
      checkoutService.initializeFromCart();

    if (!data) {
      setCheckout(null);
      return null;
    }

    setCheckout(data);

    return data;
  }

  // =========================================================
  // BUY NOW
  // =========================================================

  /**
   * Buy Now flow:
   *
   * 1. Add template vào cart
   * 2. Giữ lại style user đã chọn
   * 3. Initialize checkout từ cart
   * 4. Chuyển thẳng tới /checkout
   */
  function buyNow(
    template: MarketplaceTemplate,
    styleId?: string | null,
  ) {
    try {
      // =====================================================
      // Add template to cart
      // =====================================================

      cartService.addTemplate(
        template,
        styleId,
      );

      // =====================================================
      // Initialize checkout
      // =====================================================

      const data =
        checkoutService.initializeFromCart();

      if (!data) {
        toast.error(
          "Unable to initialize checkout.",
        );

        return;
      }

      setCheckout(data);

      // =====================================================
      // Success
      // =====================================================

      toast.success(
        "Product added. Redirecting to checkout...",
      );

      router.push("/checkout");
    } catch (error) {
      console.error(
        "BUY NOW ERROR:",
        error,
      );

      toast.error(
        "Unable to proceed to checkout.",
      );
    }
  }

  // =========================================================
  // Initial Load
  // =========================================================

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

  // =========================================================
  // Billing
  // =========================================================

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

  // =========================================================
  // Payment
  // =========================================================

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

  // =========================================================
  // Validation
  // =========================================================

  function validateBilling() {
    return checkoutService.validateBilling();
  }

  function validatePayment() {
    return checkoutService.validatePayment();
  }

  function validateCheckout() {
    return checkoutService.validateCheckout();
  }

  // =========================================================
  // Create Order
  // =========================================================

  async function createOrder(): Promise<Order | null> {
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

    // =====================================================
    // Validate
    // =====================================================

    const valid =
      checkoutService.validateCheckout();

    if (!valid) {
      toast.error(
        "Please complete your checkout information.",
      );

      return null;
    }

    // =====================================================
    // Check checkout
    // =====================================================

    if (!checkout) {
      toast.error(
        "No checkout data available.",
      );

      return null;
    }

    // =====================================================
    // Authentication
    // =====================================================

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

    // =====================================================
    // Authentication Failed
    // =====================================================

    if (!currentUser?.id) {
      console.error(
        "AUTH ERROR: Unable to restore authenticated user.",
      );

      toast.error(
        "You must be logged in to create an order.",
      );

      return null;
    }

    // =====================================================
    // Create Order
    // =====================================================

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

      // ===================================================
      // Clear Checkout
      // ===================================================

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

  // =========================================================
  // Clear Checkout
  // =========================================================

  function clear() {
    checkoutService.clear();

    setCheckout(null);

    toast.success(
      "Checkout cleared.",
    );
  }

  // =========================================================
  // Derived Data
  // =========================================================

  const items =
    checkout?.order.items ?? [];

  const subtotal =
    checkout?.order.subtotal ?? 0;

  const discount =
    checkout?.order.discount ?? 0;

  const total =
    checkout?.order.total ?? 0;

  // =========================================================
  // Context Value
  // =========================================================

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

        // BUY NOW
        buyNow,
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