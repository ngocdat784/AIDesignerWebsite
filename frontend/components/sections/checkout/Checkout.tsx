"use client";

import { cn } from "@/lib/utils";

import { useCheckout } from "@/hooks/useCheckout";

import BillingInformation from "./BillingInformation";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import OrderReview from "./OrderReview";

interface CheckoutProps {
  className?: string;
}

export default function Checkout({
  className,
}: CheckoutProps) {
  const {
    checkout,
    items,
    billing,
    payment,
    subtotal,
    discount,
    total,
    updateBilling,
    updatePayment,
    validateCheckout,
    createOrder,
  } = useCheckout();

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 lg:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Checkout
          </h1>

          <p
            className="
              mt-4
              max-w-2xl
              text-base
              leading-7
              text-muted-foreground
              md:text-lg
            "
          >
            Complete your information and review your
            order before placing it.
          </p>
        </div>

        {/* Checkout Content */}
        <div
          className="
            grid
            gap-10
            lg:grid-cols-12
            lg:items-start
          "
        >
          {/* Left */}
          <div
            className="
              space-y-8
              lg:col-span-7
            "
          >
            {/* Billing Information */}
            <BillingInformation
              billing={billing}
              onChange={updateBilling}
            />

            {/* Payment Method */}
            <PaymentMethod
              payment={payment}
              onChange={updatePayment}
            />

            {/* Order Review */}
            <OrderReview
              checkout={checkout}
              validateCheckout={validateCheckout}
              createOrder={createOrder}
            />
          </div>

          {/* Right */}
          <aside
            className="
              lg:col-span-5
              lg:sticky
              lg:top-24
            "
          >
            <OrderSummary
              items={items}
              subtotal={subtotal}
              discount={discount}
              total={total}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}