"use client";

import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";

import AppButton from "@/components/common/AppButton";
import { useCart } from "@/hooks/useCart";

interface Props {
  templateId: string;
  slug: string;
}

export default function CartItemActions({
  templateId,
  slug,
}: Props) {
  const { remove } = useCart();

  return (
    <div className="flex gap-2">

      <Link href={`/templates/${slug}`}>
        <AppButton
          variant="outline"
          size="sm"
        >
          <Eye className="mr-2 h-4 w-4" />

          View
        </AppButton>
      </Link>

      <AppButton
        variant="destructive"
        size="sm"
        onClick={() =>
          remove(templateId)
        }
      >
        <Trash2 className="mr-2 h-4 w-4" />

        Remove
      </AppButton>

    </div>
  );
}