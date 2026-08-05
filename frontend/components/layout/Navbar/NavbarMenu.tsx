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
          : "hidden items-center gap-2 lg:flex"
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
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                `
                : `
                  group
                  relative
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                `,
              active
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {Icon && (
              <span className="flex items-center">
                <Icon className="h-4 w-4" />
              </span>
            )}

            <span className="flex-1">
              {item.title}
            </span>

            {item.badge && (
              <Badge
                className="
                  rounded-full
                  bg-primary/15
                  px-2
                  py-0
                  text-[10px]
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
                  bottom-1
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