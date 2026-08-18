"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import AppButton from "@/components/common/AppButton";

import type { CheckoutData } from "@/types/checkout";
import type { Order } from "@/types/order/order";

interface OrderReviewProps {
  checkout: CheckoutData | null;
  validateCheckout: () => boolean;
  createOrder: () => Promise<Order | null>;
  className?: string;
}

export default function OrderReview({
  checkout,
  validateCheckout,
  createOrder,
  className,
}: OrderReviewProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] =
    useState(false);

  // =========================
  // Snapshot Data
  // =========================

  const billing = checkout?.billing;
  const payment = checkout?.payment;
  const order = checkout?.order;

  const fullName = billing
    ? `${billing.firstName} ${billing.lastName}`.trim()
    : "";

  const paymentLabel = (() => {
    switch (payment?.method) {
      case "card":
        return "Credit / Debit Card";

      case "paypal":
        return "Digital Wallet";

      case "bank":
        return "Bank Transfer";

      default:
        return "No payment method selected";
    }
  })();

  const items = order?.items ?? [];
  const subtotal = order?.subtotal ?? 0;
  const discount = order?.discount ?? 0;
  const total = order?.total ?? 0;

  // =========================
  // Validation
  // =========================

  const isValid =
    checkout !== null &&
    items.length > 0 &&
    validateCheckout();

  // =========================
  // Place Order
  // =========================

  async function handlePlaceOrder() {
    if (!validateCheckout()) {
      return;
    }

    setIsLoading(true);

    try {
      const order = await createOrder();

      if (!order) {
        return;
      }

      router.push("/checkout/success");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`
        rounded-2xl
        border
        bg-card
        p-6
        shadow-sm
        ${className ?? ""}
      `}
    >
      {/* Header */}

      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-primary
            "
          >
            <CheckCircle2 className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Review Order
            </h2>

            <p className="text-sm text-muted-foreground">
              Check your information before placing
              the order.
            </p>
          </div>
        </div>
      </div>

      {/* Billing Information */}

      <div className="mb-6 border-b pb-6">
        <h3 className="mb-3 font-semibold">
          Billing Information
        </h3>

        {!billing ? (
          <p className="text-sm text-muted-foreground">
            Billing information not provided.
          </p>
        ) : (
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">
                Name:
              </span>{" "}
              {fullName || "Not provided"}
            </p>

            <p>
              <span className="font-medium">
                Email:
              </span>{" "}
              {billing.email || "Not provided"}
            </p>

            <p>
              <span className="font-medium">
                Phone:
              </span>{" "}
              {billing.phone || "Not provided"}
            </p>

            <p>
              <span className="font-medium">
                Address:
              </span>{" "}
              {billing.address || "Not provided"}
            </p>

            <p>
              <span className="font-medium">
                City:
              </span>{" "}
              {billing.city || "Not provided"}
            </p>

            <p>
              <span className="font-medium">
                Country:
              </span>{" "}
              {billing.country || "Not provided"}
            </p>

            <p>
              <span className="font-medium">
                Postal Code:
              </span>{" "}
              {billing.postalCode || "Not provided"}
            </p>
          </div>
        )}
      </div>

      {/* Payment */}

      <div className="mb-6 border-b pb-6">
        <h3 className="mb-3 font-semibold">
          Payment Method
        </h3>

        <p className="text-sm text-muted-foreground">
          {paymentLabel}
        </p>
      </div>

      {/* Order Summary */}

      <div className="mb-6 space-y-3">
        <h3 className="font-semibold">
          Order Total
        </h3>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Items
          </span>

          <span>
            {items.length}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal
          </span>

          <span>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Discount
          </span>

          <span className="text-green-600">
            -${discount.toFixed(2)}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            pt-4
          "
        >
          <span className="text-lg font-semibold">
            Total
          </span>

          <span className="text-2xl font-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Place Order */}

      <AppButton
        type="button"
        className="
          h-12
          w-full
          rounded-xl
          text-base
          font-semibold
        "
        disabled={!isValid || isLoading}
        onClick={handlePlaceOrder}
      >
        {isLoading
          ? "Creating Order..."
          : "Place Order"}
      </AppButton>

      {!isValid && (
        <p
          className="
            mt-3
            text-center
            text-xs
            text-muted-foreground
          "
        >
          Please complete your billing information,
          payment method and order before placing
          the order.
        </p>
      )}
    </div>
  );
}