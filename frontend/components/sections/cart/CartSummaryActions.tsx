import Link from "next/link";

import AppButton from "@/components/common/AppButton";

export default function CartSummaryActions() {
  return (
    <div className="space-y-3">

      <Link href="/marketplace">
        <AppButton
          variant="outline"
          className="w-full"
        >
          Continue Shopping
        </AppButton>
      </Link>

      <Link href="/checkout">
        <AppButton className="w-full">
          Proceed to Checkout
        </AppButton>
      </Link>

    </div>
  );
}