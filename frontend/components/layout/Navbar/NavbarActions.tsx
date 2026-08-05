"use client";

import ThemeToggle from "@/components/common/ThemeToggle";

import NavbarCart from "./NavbarCart";
import NavbarUser from "./NavbarUser";

interface NavbarActionsProps {
  className?: string;
}

export default function NavbarActions({
  className,
}: NavbarActionsProps) {
  return (
    <div
      className={[
        "flex items-center gap-2",
        className,
      ].join(" ")}
    >
      <ThemeToggle />

      <NavbarCart />

      <NavbarUser />
    </div>
  );
}