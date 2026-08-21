"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  currentLabel?: string;
}

export default function Breadcrumb({
  currentLabel,
}: BreadcrumbProps) {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean);

  const items = segments.map((segment, index) => {
    const href =
      "/" + segments.slice(0, index + 1).join("/");

    const label =
      index === segments.length - 1 && currentLabel
        ? currentLabel
        : segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) =>
              char.toUpperCase(),
            );

    return {
      label,
      href,
      isLast: index === segments.length - 1,
    };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-muted-foreground"
    >
      <Link
        href="/"
        className="
          inline-flex
          items-center
          gap-1.5
          transition-colors
          hover:text-foreground
        "
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>

      {items.map((item) => (
        <div
          key={item.href}
          className="flex items-center gap-2"
        >
          <ChevronRight className="h-4 w-4 opacity-50" />

          {item.isLast ? (
            <span
              className="
                font-medium
                text-foreground
              "
            >
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="
                transition-colors
                hover:text-foreground
              "
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}