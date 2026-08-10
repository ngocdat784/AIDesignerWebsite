"use client";

import {
  CreditCard,
  Landmark,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type { CheckoutPaymentInfo } from "@/types/checkout";

interface PaymentMethodProps {
  payment: CheckoutPaymentInfo | null;
  onChange: (payment: CheckoutPaymentInfo) => void;
  className?: string;
}

const paymentMethods = [
  {
    id: "card" as const,
    title: "Credit / Debit Card",
    description:
      "Pay securely using your bank card.",
    icon: CreditCard,
  },
  {
    id: "bank" as const,
    title: "Bank Transfer",
    description:
      "Transfer directly from your bank account.",
    icon: Landmark,
  },
  {
    id: "paypal" as const,
    title: "Digital Wallet",
    description:
      "Pay using your preferred digital wallet.",
    icon: Wallet,
  },
];

export default function PaymentMethod({
  payment,
  onChange,
  className,
}: PaymentMethodProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border bg-card p-6 shadow-sm",
        className
      )}
    >
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Payment Method
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Choose how you would like to pay for
          your order.
        </p>
      </div>

      {/* Payment methods */}

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;

          const active =
            payment?.method === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() =>
                onChange({
                  method: method.id,
                })
              }
              className={cn(
                `
                flex
                w-full
                items-center
                gap-4
                rounded-xl
                border
                p-4
                text-left
                transition-all
                duration-200
                `,
                active
                  ? `
                    border-primary
                    bg-primary/5
                    shadow-sm
                  `
                  : `
                    border-border
                    bg-background
                    hover:border-primary/40
                    hover:bg-primary/[0.03]
                  `
              )}
            >
              {/* Icon */}

              <div
                className={cn(
                  `
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  `,
                  active
                    ? `
                      bg-primary
                      text-primary-foreground
                    `
                    : `
                      bg-muted
                      text-muted-foreground
                    `
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "font-medium",
                    active && "text-primary"
                  )}
                >
                  {method.title}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>

              {/* Radio indicator */}

              <div
                className={cn(
                  `
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  `,
                  active
                    ? "border-primary"
                    : "border-muted-foreground/40"
                )}
              >
                {active && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}