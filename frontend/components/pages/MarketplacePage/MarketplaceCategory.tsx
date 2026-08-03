"use client";

import { CATEGORIES } from "@/lib/constants/categories";

import { useMarketplace } from "./hooks/useMarketplace";

export default function MarketplaceCategory() {
  const { category, setCategory } = useMarketplace();

  return (
    <div className="flex flex-wrap gap-3">
      {CATEGORIES.map((item) => (
        <button
          key={item}
          onClick={() =>
            setCategory(item)
          }
          className={
            item === category
              ? "rounded-xl bg-primary px-4 py-2 text-primary-foreground"
              : "rounded-xl border px-4 py-2"
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
}