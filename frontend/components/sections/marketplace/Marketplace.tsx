"use client";

import Container from "@/components/ui/container";
import Section from "@/components/ui/section";

import { useMarketplace } from "./hooks";

import MarketplaceBackground from "./MarketplaceBackground";
import MarketplaceGradient from "./MarketplaceGradient";
import MarketplaceHeader from "./MarketplaceHeader";
import MarketplaceToolbar from "./MarketplaceToolbar";
import MarketplaceGridView from "./GridView";
import MarketplaceListView from "./ListView";
import MarketplacePagination from "./MarketplacePagination";
import MarketplaceEmpty from "./MarketplaceEmpty";
//import MarketplaceLoading from "./MarketplaceLoading";

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
    <Section
      id="marketplace"
      className="relative overflow-hidden"
    >
      <MarketplaceBackground />

      <MarketplaceGradient />

      <Container className="relative z-10">
        <MarketplaceHeader />

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

        {/* Loading */}

        {/*
        if (loading) {
          return <MarketplaceLoading />;
        }
        */}

        {/* Empty */}

        {templates.length === 0 ? (
          <MarketplaceEmpty />
        ) : view === "grid" ? (
          <MarketplaceGridView
            templates={templates}
          />
        ) : (
          <MarketplaceListView
            templates={templates}
          />
        )}

        <MarketplacePagination />
      </Container>
    </Section>
  );
}