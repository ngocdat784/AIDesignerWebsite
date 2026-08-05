"use client";

import Link from "next/link";

import Logo from "@/components/common/Logo";
import { cn } from "@/lib/utils";

import { footerData } from "./footer.data";

interface FooterBrandProps {
  className?: string;
}

export default function FooterBrand({
  className,
}: FooterBrandProps) {
  const { brand } = footerData;

  return (
    <div
      className={cn(
        "space-y-5",
        className
      )}
    >
      {/* Logo */}

      <Link
        href="/"
        className="
          inline-flex
          transition-transform
          duration-300
          hover:scale-[1.02]
        "
      >
        <Logo />
      </Link>

      {/* Brand */}

      <div className="space-y-1">
        <h3 className="text-lg font-bold tracking-tight">
          {brand.name}
        </h3>

        {brand.subtitle && (
          <p className="text-sm font-medium text-primary">
            {brand.subtitle}
          </p>
        )}
      </div>

      {/* Description */}

      <p
        className="
          max-w-sm
          text-sm
          leading-7
          text-muted-foreground
        "
      >
        {brand.description}
      </p>

      {/* Badge */}

      {brand.badge && (
        <div
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-primary/20
            bg-primary/5
            px-4
            py-2
            text-xs
            font-semibold
            text-primary
          "
        >
          {brand.badge}
        </div>
      )}
    </div>
  );
}