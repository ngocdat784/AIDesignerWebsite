"use client";

import MarketplaceSearch from "./MarketplaceSearch";
import MarketplaceCategory from "./MarketplaceCategory";
import MarketplaceSort from "./MarketplaceSort";
import PageSizeSelector from "./PageSizeSelector";
import ViewModeSwitcher from "./ViewModeSwitcher";

export default function MarketplaceToolbar() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Bên trái */}
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <div className="flex-1">
          <MarketplaceSearch />
        </div>

        <MarketplaceCategory />
      </div>

      {/* Bên phải */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <PageSizeSelector />

<MarketplaceSort />

<ViewModeSwitcher />
      </div>
    </div>
  );
}