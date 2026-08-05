"use client";

import Link from "next/link";

import { ShoppingCart } from "lucide-react";

import AppButton from "@/components/common/AppButton";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface NavbarCartProps {
  className?: string;
}

export default function NavbarCart({
  className,
}: NavbarCartProps) {
  const { itemCount } = useCart();

  return (
    <Link href="/cart">
      <AppButton
        variant="ghost"
        size="icon"
        className={cn(
          "relative overflow-visible",
          className
        )}
      >
        <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

        {itemCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              min-h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-primary
              px-1
              text-[10px]
              font-bold
              leading-none
              text-primary-foreground
              shadow-lg
              ring-2
              ring-background
              animate-in
              zoom-in-75
            "
          >
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </AppButton>
    </Link>
  );
}