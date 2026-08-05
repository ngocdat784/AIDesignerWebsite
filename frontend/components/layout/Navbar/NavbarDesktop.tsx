"use client";

import NavbarActions from "./NavbarActions";
import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";
import NavbarSearch from "./NavbarSearch";

interface NavbarDesktopProps {
  className?: string;
}

export default function NavbarDesktop({
  className,
}: NavbarDesktopProps) {
  return (
    <div
      className={`
        hidden
        lg:flex
        h-16
        w-full
        items-center
        justify-between
        gap-8
        ${className ?? ""}
      `}
    >
      {/* Left */}
      <div className="flex items-center gap-8">
        <NavbarBrand />

        <NavbarMenu />
      </div>

      {/* Center */}
      <div className="flex flex-1 justify-center px-6">
        <NavbarSearch className="w-full max-w-xl" />
      </div>

      {/* Right */}
      <div className="flex items-center">
        <NavbarActions />
      </div>
    </div>
  );
}