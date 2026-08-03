"use client";

import { Input } from "@/components/ui/input";
import { useMarketplace } from "./hooks/useMarketplace";

export default function MarketplaceSearch() {
  const { search, setSearch } = useMarketplace();

  return (
    <Input
      value={search}
  onChange={(e) => setSearch(e.target.value)}
    />
  );
}