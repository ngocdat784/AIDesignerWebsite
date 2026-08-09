"use client";

import { Search, X } from "lucide-react";

import AppInput from "@/components/common/AppInput";
import { cn } from "@/lib/utils";

interface MarketplaceSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function MarketplaceSearch({
  value,
  onChange,
  placeholder = "Search templates, creators or tags...",
  className,
}: MarketplaceSearchProps) {
  return (
    <div
      className={cn(
        `
          relative
          w-full
          max-w-xl
          mx-auto
        `,
        className
      )}
    >
      {/* Search Icon */}
      <Search
        className="
          absolute
          left-5
          top-1/2
          h-5
          w-5
          -translate-y-1/2
          text-muted-foreground
          transition-colors
        "
      />

      {/* Input */}
      <AppInput
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-border/70
          bg-background/90
          pl-13
          pr-12
          text-base
          shadow-sm
          backdrop-blur-sm
          transition-all
          duration-300
          hover:border-primary/30
          hover:shadow-md
          focus:border-primary/40
          focus:ring-2
          focus:ring-primary/10
        "
      />

      {/* Clear */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1.5
            text-muted-foreground
            transition-all
            duration-200
            hover:bg-muted
            hover:text-foreground
          "
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}