"use client";

import { useMemo, useState } from "react";

import {
  MARKETPLACE_DEFAULT_TAB,
  MARKETPLACE_DEFAULT_CATEGORY,
  MARKETPLACE_DEFAULT_SORT,
  MARKETPLACE_DEFAULT_VIEW,
  MARKETPLACE_ITEMS_PER_PAGE,
} from "./constants";

import { marketplaceData } from "./marketplace.data";

import {
  filterByCategory,
  filterByTab,
  getTotalPages,
  paginateTemplates,
  searchTemplates,
  sortTemplates,
} from "./utils";

import type {
  MarketplaceCategoryId,
  MarketplaceSort,
  MarketplaceTabId,
  MarketplaceView,
} from "./types";
export function useMarketplace() {
  const [search, setSearch] =
  useState<string>("");

const [tab, setTab] =
  useState<MarketplaceTabId>(
    MARKETPLACE_DEFAULT_TAB
  );

const [category, setCategory] =
  useState<MarketplaceCategoryId>(
    MARKETPLACE_DEFAULT_CATEGORY
  );

const [sort, setSort] =
  useState<MarketplaceSort>(
    MARKETPLACE_DEFAULT_SORT
  );

const [view, setView] =
  useState<MarketplaceView>(
    MARKETPLACE_DEFAULT_VIEW
  );

const [page, setPage] =
  useState<number>(1);

  const filteredTemplates =
    useMemo(() => {
      let data =
        marketplaceData.templates;

      data = searchTemplates(
        data,
        search
      );

      data = filterByCategory(
        data,
        category
      );

      data = filterByTab(
        data,
        tab
      );

      data = sortTemplates(
        data,
        sort
      );

      return data;
    }, [
      search,
      category,
      tab,
      sort,
    ]);

  const totalPages =
    getTotalPages(
      filteredTemplates.length,
      MARKETPLACE_ITEMS_PER_PAGE
    );

  const templates = useMemo(
    () =>
      paginateTemplates(
        filteredTemplates,
        page,
        MARKETPLACE_ITEMS_PER_PAGE
      ),
    [
      filteredTemplates,
      page,
    ]
  );

  function resetFilters() {
  setSearch("");

  setCategory(MARKETPLACE_DEFAULT_CATEGORY);

  setTab(MARKETPLACE_DEFAULT_TAB);

  setSort(MARKETPLACE_DEFAULT_SORT);

  setPage(1);
}

  return {
    /* data */

    header:
      marketplaceData.header,

    tabs:
      marketplaceData.tabs,

    filters:
      marketplaceData.filters,

    categories:
      marketplaceData.categories,

    templates,

    filteredTemplates,

    /* state */

    search,

    category,

    tab,

    sort,

    page,

    view,

    totalPages,

    /* actions */

    setSearch,

    setCategory,

    setTab,

    setSort,

    setPage,

    setView,

    resetFilters,
  };
}