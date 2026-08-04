"use client";

import { Minus, Plus } from "lucide-react";

import AppButton from "@/components/common/AppButton";
import { useCart } from "@/hooks/useCart";

interface Props {
  templateId: string;
  quantity: number;
}

export default function CartItemQuantity({
  templateId,
  quantity,
}: Props) {
  const {
    increase,
    decrease,
  } = useCart();

  return (
    <div className="flex items-center gap-2">

      <AppButton
        size="icon"
        variant="outline"
        onClick={() =>
          decrease(templateId)
        }
      >
        <Minus className="h-4 w-4" />
      </AppButton>

      <span className="w-8 text-center font-medium">
        {quantity}
      </span>

      <AppButton
        size="icon"
        variant="outline"
        onClick={() =>
          increase(templateId)
        }
      >
        <Plus className="h-4 w-4" />
      </AppButton>

    </div>
  );
}