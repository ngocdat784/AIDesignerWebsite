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
        "flex flex-col",
        className
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="
          inline-flex
          w-fit
          transition-transform
          duration-300
          hover:scale-[1.02]
        "
      >
        <Logo />
      </Link>

      {/* Description */}
      <p
        className="
          max-w-sm
          text-sm
          leading-7
          text-muted-foreground
        "
        style={{
          marginTop: "18px",
        }}
      >
        {brand.description}
      </p>

      {/* Badge */}
      {brand.badge && (
        <div
          className="
            inline-flex
            w-fit
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
          style={{
            marginTop: "12px",
          }}
        >
          {brand.badge}
        </div>
      )}
    </div>
  );
}