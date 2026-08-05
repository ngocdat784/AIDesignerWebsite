"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { footerData } from "./footer.data";

interface FooterSocialProps {
  className?: string;
}

export default function FooterSocial({
  className,
}: FooterSocialProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3",
        className
      )}
    >
      {footerData.socials.map((social) => {
        const Icon = social.icon;

        return (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            aria-label={social.name}
            className="
              group
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-border
              bg-background
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-primary/40
              hover:bg-primary
              hover:shadow-lg
              hover:shadow-primary/20
            "
          >
            <Icon
              className="
                h-5
                w-5
                text-muted-foreground
                transition-colors
                duration-300
                group-hover:text-primary-foreground
              "
            />
          </Link>
        );
      })}
    </div>
  );
}