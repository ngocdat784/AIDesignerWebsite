"use client";

import { cn } from "@/lib/utils";

import type {
  MarketplaceTab,
  MarketplaceTabId,
} from "./types";

interface MarketplaceTabsProps {
  tabs: MarketplaceTab[];
  value: MarketplaceTabId;
  onChange: (tab: MarketplaceTabId) => void;
  className?: string;
}

export default function MarketplaceTabs({
  tabs,
  value,
  onChange,
  className,
}: MarketplaceTabsProps) {
  return (
    <div
      className={cn(
        `
        flex
        flex-wrap
        items-center
        gap-3
        `,
        className
      )}
    >
      {tabs.map((tab) => {
        const active = value === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              `
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              px-5
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-300
              `,
              active
                ? `
                  border-primary
                  bg-primary
                  text-primary-foreground
                  shadow-md
                `
                : `
                  border-border
                  bg-background
                  text-muted-foreground
                  hover:border-primary/40
                  hover:text-primary
                `
            )}
          >
            <span>{tab.label}</span>

            {typeof tab.count === "number" && (
              <span
                className={cn(
                  `
                  rounded-full
                  px-2
                  py-0.5
                  text-xs
                  font-semibold
                  `,
                  active
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}