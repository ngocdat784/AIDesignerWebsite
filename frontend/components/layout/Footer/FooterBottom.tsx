"use client";

import Link from "next/link";

import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";

interface FooterBottomProps {
  className?: string;

  version?: string;
}

export default function FooterBottom({
  className,
  version = "v1.0.0",
}: FooterBottomProps) {
  const year = new Date().getFullYear();

  return (
    <div
      className={cn(
        `
        flex
        flex-col
        gap-4
        border-t
        pt-6
        text-sm
        text-muted-foreground
        md:flex-row
        md:items-center
        md:justify-between
        `,
        className
      )}
    >
      {/* Left */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-2
        "
      >
        <span>
          © {year} AI Designer.
        </span>

        <span>All rights reserved.</span>

        <span className="hidden md:inline">•</span>

        <span className="flex items-center gap-1">
          Made with

          <Heart
            className="
              h-3.5
              w-3.5
              fill-red-500
              text-red-500
            "
          />

          using Next.js
        </span>
      </div>

      {/* Right */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-4
        "
      >
        <Link
          href="/privacy"
          className="
            transition-colors
            hover:text-primary
          "
        >
          Privacy
        </Link>

        <Link
          href="/terms"
          className="
            transition-colors
            hover:text-primary
          "
        >
          Terms
        </Link>

        <Link
          href="/cookies"
          className="
            transition-colors
            hover:text-primary
          "
        >
          Cookies
        </Link>

        <span
          className="
            rounded-full
            border
            bg-muted
            px-2.5
            py-1
            text-xs
            font-medium
          "
        >
          {version}
        </span>
      </div>
    </div>
  );
}