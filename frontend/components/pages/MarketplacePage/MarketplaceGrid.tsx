"use client";

import { useMarketplace } from "./hooks/useMarketplace";

import MarketplaceGridView from "@/components/sections/marketplace/GridView";
import MarketplaceListView from "@/components/sections/marketplace/ListView";

export default function MarketplaceGrid() {
  const { templates, view } = useMarketplace();

  if (templates.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed">
        <p className="text-muted-foreground">
          No templates found.
        </p>
      </div>
    );
  }

  if (view === "list") {
    return (
      <MarketplaceListView
        templates={templates}
      />
    );
  }

  return (
    <MarketplaceGridView
      templates={templates}
    />
  );
}