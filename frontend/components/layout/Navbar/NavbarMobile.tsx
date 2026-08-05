"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Menu,
  X,
} from "lucide-react";

import AppButton from "@/components/common/AppButton";
import ThemeToggle from "@/components/common/ThemeToggle";
import { cn } from "@/lib/utils";

import NavbarActions from "./NavbarActions";
import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";
import NavbarSearch from "./NavbarSearch";

interface NavbarMobileProps {
  className?: string;
}

export default function NavbarMobile({
  className,
}: NavbarMobileProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div
        className={cn(
          "flex h-16 items-center justify-between lg:hidden",
          className
        )}
      >
        <NavbarBrand compact />

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <AppButton
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </AppButton>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300",
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        )}
      />

      {/* Drawer */}
      <aside
        className={cn(
          `
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[320px]
          flex-col
          border-r
          bg-background
          shadow-2xl
          transition-transform
          duration-300
          `,
          open
            ? "translate-x-0"
            : "-translate-x-full"
        )}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">
          <NavbarBrand />

          <AppButton
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </AppButton>
        </div>

        {/* Search */}

        <div className="p-5">
          <NavbarSearch className="flex max-w-none lg:hidden" />
        </div>

        {/* Menu */}

        <div className="flex-1 overflow-y-auto px-4">
          <NavbarMenu mobile />
        </div>

        {/* Bottom */}

        <div className="space-y-4 border-t p-5">

          <NavbarActions />

          <Link href="/login">
            <AppButton className="w-full">
              Login
            </AppButton>
          </Link>

        </div>
      </aside>
    </>
  );
}