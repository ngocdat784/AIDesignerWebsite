"use client";

import Link from "next/link";

import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

import { footerData } from "./footer.data";

interface FooterLinksProps {
  className?: string;
}

export default function FooterLinks({
  className,
}: FooterLinksProps) {
  return (
    <div
      className={cn(
        `
        grid
        grid-cols-2
        gap-8
        sm:grid-cols-2
        lg:grid-cols-4
        `,
        className
      )}
    >
      {footerData.sections.map((section) => (
        <div
          key={section.title}
          className="space-y-4"
        >
          {/* Title */}

          <h3
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-foreground
            "
          >
            {section.title}
          </h3>

          {/* Links */}

          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  target={
                    link.external
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    link.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="
                    group
                    inline-flex
                    items-center
                    gap-1.5
                    text-sm
                    text-muted-foreground
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:text-primary
                  "
                >
                  {link.title}

                  {link.external && (
                    <ExternalLink
                      className="
                        h-3.5
                        w-3.5
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:opacity-100
                      "
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}