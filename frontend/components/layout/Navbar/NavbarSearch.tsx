"use client";

import { useEffect, useState } from "react";

import {
  Search,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface NavbarSearchProps {
  placeholder?: string;

  onSearch?: (value: string) => void;

  className?: string;

  mobile?: boolean;
}

export default function NavbarSearch({
  placeholder = "Search templates, AI tools...",
  onSearch,
  className,
  mobile = false,
}: NavbarSearchProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div
      className={cn(
        mobile
          ? "flex"
          : "hidden lg:flex",

        `
        group
        relative
        w-full
        max-w-md
        items-center
        rounded-2xl
        border
        border-border/60
        bg-background/70
        backdrop-blur-xl
        transition-all
        duration-300
        focus-within:border-primary/40
        focus-within:shadow-lg
        focus-within:shadow-primary/10
        `,

        className
      )}
    >
      <Search
        className="
          ml-4
          h-4
          w-4
          text-muted-foreground
          transition-colors
          duration-300
          group-focus-within:text-primary
        "
      />

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="
          h-11
          flex-1
          bg-transparent
          px-3
          text-sm
          outline-none
          placeholder:text-muted-foreground
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="
            mr-2
            rounded-full
            p-1
            transition-colors
            hover:bg-muted
          "
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {!value && (
        <kbd
          className={cn(
            "mr-3 rounded-md border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground",
            mobile ? "hidden" : "hidden xl:flex"
          )}
        >
          Ctrl K
        </kbd>
      )}
    </div>
  );
}