"use client";

import { cn } from "@/lib/utils";

import type { CheckoutBillingInfo } from "@/types/checkout";

interface BillingInformationProps {
  billing: CheckoutBillingInfo | null;
  onChange: (billing: CheckoutBillingInfo) => void;
  className?: string;
}

const emptyBilling: CheckoutBillingInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
};

export default function BillingInformation({
  billing,
  onChange,
  className,
}: BillingInformationProps) {
  const form = billing ?? emptyBilling;

  function updateField(
    field: keyof CheckoutBillingInfo,
    value: string
  ) {
    onChange({
      ...form,
      [field]: value,
    });
  }

  return (
    <div
      className={cn(
        `
        rounded-2xl
        border
        bg-card
        p-6
        shadow-sm
        md:p-8
        `,
        className
      )}
    >
      {/* Header */}
      <div className="mb-8">
        <h2
          className="
            text-2xl
            font-bold
            tracking-tight
          "
        >
          Billing Information
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-muted-foreground
          "
        >
          Enter your billing information to
          complete your order.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Name */}
        <div
          className="
            grid
            gap-5
            md:grid-cols-2
          "
        >
          {/* First Name */}
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="
                text-sm
                font-medium
              "
            >
              First Name
            </label>

            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={(e) =>
                updateField(
                  "firstName",
                  e.target.value
                )
              }
              placeholder="Enter your first name"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-4
                text-sm
                outline-none
                transition-all
                duration-200
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="
                text-sm
                font-medium
              "
            >
              Last Name
            </label>

            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={(e) =>
                updateField(
                  "lastName",
                  e.target.value
                )
              }
              placeholder="Enter your last name"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-4
                text-sm
                outline-none
                transition-all
                duration-200
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div
          className="
            grid
            gap-5
            md:grid-cols-2
          "
        >
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="
                text-sm
                font-medium
              "
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
              placeholder="you@example.com"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-4
                text-sm
                outline-none
                transition-all
                duration-200
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="
                text-sm
                font-medium
              "
            >
              Phone
            </label>

            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) =>
                updateField(
                  "phone",
                  e.target.value
                )
              }
              placeholder="Enter your phone number"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-4
                text-sm
                outline-none
                transition-all
                duration-200
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label
            htmlFor="address"
            className="
              text-sm
              font-medium
            "
          >
            Address
          </label>

          <input
            id="address"
            type="text"
            value={form.address}
            onChange={(e) =>
              updateField(
                "address",
                e.target.value
              )
            }
            placeholder="Enter your billing address"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-border
              bg-background
              px-4
              text-sm
              outline-none
              transition-all
              duration-200
              placeholder:text-muted-foreground
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
            "
          />
        </div>

        {/* City / Country / Postal Code */}
        <div
          className="
            grid
            gap-5
            md:grid-cols-3
          "
        >
          {/* City */}
          <div className="space-y-2">
            <label
              htmlFor="city"
              className="
                text-sm
                font-medium
              "
            >
              City
            </label>

            <input
              id="city"
              type="text"
              value={form.city}
              onChange={(e) =>
                updateField(
                  "city",
                  e.target.value
                )
              }
              placeholder="City"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-4
                text-sm
                outline-none
                transition-all
                duration-200
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="
                text-sm
                font-medium
              "
            >
              Country
            </label>

            <input
              id="country"
              type="text"
              value={form.country}
              onChange={(e) =>
                updateField(
                  "country",
                  e.target.value
                )
              }
              placeholder="Country"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-4
                text-sm
                outline-none
                transition-all
                duration-200
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <label
              htmlFor="postalCode"
              className="
                text-sm
                font-medium
              "
            >
              Postal Code
            </label>

            <input
              id="postalCode"
              type="text"
              value={form.postalCode}
              onChange={(e) =>
                updateField(
                  "postalCode",
                  e.target.value
                )
              }
              placeholder="Postal code"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-4
                text-sm
                outline-none
                transition-all
                duration-200
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}