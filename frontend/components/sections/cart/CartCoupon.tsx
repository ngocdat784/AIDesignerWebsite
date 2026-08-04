"use client";

import { useState } from "react";

import AppButton from "@/components/common/AppButton";
import { Input } from "@/components/ui/input";

export default function CartCoupon() {
  const [coupon, setCoupon] = useState("");

  function applyCoupon() {
    console.log("Coupon:", coupon);

    // TODO:
    // Kết nối backend sau này
  }

  return (
    <div className="space-y-3">
      <Input
        placeholder="Coupon code"
        value={coupon}
        onChange={(e) =>
          setCoupon(e.target.value)
        }
      />

      <AppButton
        variant="outline"
        className="w-full"
        onClick={applyCoupon}
      >
        Apply Coupon
      </AppButton>
    </div>
  );
}