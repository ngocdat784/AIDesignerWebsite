"use client";

import { useMarketplace } from "./hooks";

import MarketplaceBackground from "./MarketplaceBackground";
import MarketplaceGradient from "./MarketplaceGradient";
import MarketplaceHeader from "./MarketplaceHeader";
import MarketplaceToolbar from "./MarketplaceToolbar";
import MarketplaceGridView from "./GridView";
import MarketplaceListView from "./ListView";
import MarketplacePagination from "./MarketplacePagination";
import MarketplaceEmpty from "./MarketplaceEmpty";
// import MarketplaceLoading from "./MarketplaceLoading";

export default function Marketplace() {
  const {
    templates,

    search,
    setSearch,

    tabs,
    tab,
    setTab,

    categories,
    category,
    setCategory,

    sort,
    setSort,

    view,
    setView,
  } = useMarketplace();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <MarketplaceBackground />

      {/* Gradient */}
      <MarketplaceGradient />

      {/* Content */}
      <div
        className="
          relative
          z-10
          w-full
          px-6
          md:px-8
        "
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Header */}
        <div
          className="w-full"
          style={{
            marginTop: "80px",
          }}
        >
          <MarketplaceHeader />
        </div>

        {/* Toolbar */}
        <div
          className="w-full"
          style={{
            marginTop: "48px",
          }}
        >
          <MarketplaceToolbar
            search={search}
            onSearchChange={setSearch}
            tabs={tabs}
            activeTab={tab}
            onTabChange={setTab}
            categories={categories}
            activeCategory={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
          />
        </div>

        {/* Content / Grid */}
        <div
          className="w-full"
          style={{
            marginTop: "48px",
          }}
        >
          {templates.length === 0 ? (
            <MarketplaceEmpty />
          ) : view === "grid" ? (
            <MarketplaceGridView templates={templates} />
          ) : (
            <MarketplaceListView templates={templates} />
          )}
        </div>

        {/* Pagination */}
        <div
          className="flex w-full justify-center"
          style={{
            marginTop: "56px",
            marginBottom: "80px",
          }}
        >
          <MarketplacePagination />
        </div>
      </div>
    </section>
  );
}