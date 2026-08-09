"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { navbarLinks } from "./navbar.data";

interface NavbarMenuProps {
  mobile?: boolean;
}

export default function NavbarMenu({
  mobile = false,
}: NavbarMenuProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        mobile
          ? "flex flex-col gap-2"
          : "hidden items-center gap-5 lg:flex"
      )}
    >
      {navbarLinks.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;

        return (
  <Link
    key={item.href}
    href={item.href}
    className={cn(
      mobile
        ? `
          group
          flex
          items-center
          gap-3
          rounded-xl
          px-4
          py-3
          text-base
          font-sans
          font-medium
          transition-all
          duration-300
        `
        : `
  group
  relative
  flex
  items-center
  gap-4
  rounded-full
  px-12
  py-3
  text-base
  font-sans
  font-medium
  whitespace-nowrap
  transition-all
  duration-300
`,
      active
        ? "bg-primary text-primary-foreground shadow-md"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    )}
  >
    {Icon && (
  <span className="flex shrink-0 items-center">
    <Icon
      className="h-5 w-5"
      strokeWidth={1.8}
    />
  </span>
)}
    <span className="flex items-center">
      {item.title}
    </span>

    {item.badge && (
      <Badge
        className="
          rounded-full
          bg-primary/10
          px-2
          py-0.5
          text-[10px]
          font-sans
          font-semibold
          text-primary
        "
      >
        {item.badge}
      </Badge>
    )}

    {!mobile && !active && (
      <span
        className="
          absolute
          bottom-0.5
          left-1/2
          h-0.5
          w-0
          -translate-x-1/2
          rounded-full
          bg-primary
          transition-all
          duration-300
          group-hover:w-8
        "
      />
    )}
  </Link>
        );
      })}
    </nav>
  );
}