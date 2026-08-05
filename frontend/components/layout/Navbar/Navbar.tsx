"use client";

import { cn } from "@/lib/utils";

import NavbarActions from "./NavbarActions";
import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";

interface NavbarProps {
  className?: string;
}

export default function Navbar({
  className,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-border/60",
        "bg-background/80",
        "backdrop-blur-xl",
        "supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div
        className="
          mx-auto
          flex
          h-18
          max-w-7xl
          items-center
          justify-between
          px-6
          lg:px-8
        "
      >
        <NavbarBrand />

        <div className="hidden lg:flex">
          <NavbarMenu />
        </div>

        <NavbarActions />
      </div>
    </header>
  );
}