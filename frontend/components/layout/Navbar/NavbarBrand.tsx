"use client";

import Link from "next/link";

import Logo from "@/components/common/Logo";
import { cn } from "@/lib/utils";

interface NavbarBrandProps {
  compact?: boolean;

  className?: string;
}

export default function NavbarBrand({
  compact = false,
  className,
}: NavbarBrandProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center transition-all duration-300",
        className
      )}
    >
      <Logo compact={compact} />
    </Link>
  );
}