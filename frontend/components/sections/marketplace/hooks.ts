"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

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
  MarketplaceTemplate,
} from "./types";

import {
  templateService,
} from "@/services/template.service";

import type {
  Template,
} from "@/types/template/template";

// =========================================================
// Mapping
// Template API/Service -> MarketplaceTemplate
// =========================================================

function toMarketplaceTemplate(
  template: Template,
): MarketplaceTemplate {
  return {
    id: template.id,

    slug: template.slug,

    title: template.title,

    description: template.description,

    thumbnail: template.thumbnail,

    images:
      template.images ?? [],

    category: template.category,

    tags:
      template.tags ?? [],

    authorId: template.authorId,

    author: {
      name:
        template.author?.name ??
        "Unknown Author",

      avatar:
        template.author?.avatar ??
        "/avatars/default.png",

      verified: false,
    },

    rating:
      template.rating ?? 0,

    reviews:
      template.reviews ?? 0,

    downloads:
      template.downloads ?? 0,

    price:
      template.price,

    /*
     * Nếu MarketplaceTemplate có discountPrice,
     * dùng price hiện tại làm discountPrice.
     */
    discountPrice:
      template.discountPrice ??
      template.price,

    originalPrice:
      template.originalPrice ??
      undefined,

    featured:
      template.featured ?? false,

    newest:
      template.newest ?? false,

    stock:
      template.stock ??
      undefined,

    license:
      template.license ??
      undefined,
  };
}

// =========================================================
// Hook
// =========================================================

export function useMarketplace() {
  // =======================================================
  // API templates
  // =======================================================

  const [
    allTemplates,
    setAllTemplates,
  ] = useState<MarketplaceTemplate[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  // =======================================================
  // Load templates from backend
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    async function loadTemplates() {
      try {
        setIsLoading(true);
        setError(null);

        const result =
          await templateService.getAll();

        if (cancelled) {
          return;
        }

        const mappedTemplates =
          result.map(
            toMarketplaceTemplate,
          );

        setAllTemplates(
          mappedTemplates,
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Không thể tải danh sách template.",
        );

        setAllTemplates([]);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadTemplates();

    return () => {
      cancelled = true;
    };
  }, []);

  // =======================================================
  // Marketplace state
  // =======================================================

  const [search, setSearch] =
    useState<string>("");

  const [tab, setTab] =
    useState<MarketplaceTabId>(
      MARKETPLACE_DEFAULT_TAB,
    );

  const [category, setCategory] =
    useState<MarketplaceCategoryId>(
      MARKETPLACE_DEFAULT_CATEGORY,
    );

  const [sort, setSort] =
    useState<MarketplaceSort>(
      MARKETPLACE_DEFAULT_SORT,
    );

  const [view, setView] =
    useState<MarketplaceView>(
      MARKETPLACE_DEFAULT_VIEW,
    );

  const [page, setPage] =
    useState<number>(1);

  // =======================================================
  // Filter / Search / Tab / Sort
  // =======================================================

  const filteredTemplates =
    useMemo(() => {
      let data =
        allTemplates;

      data =
        searchTemplates(
          data,
          search,
        );

      data =
        filterByCategory(
          data,
          category,
        );

      data =
        filterByTab(
          data,
          tab,
        );

      data =
        sortTemplates(
          data,
          sort,
        );

      return data;
    }, [
      allTemplates,
      search,
      category,
      tab,
      sort,
    ]);

  // =======================================================
  // Pagination
  // =======================================================

  const totalPages =
    getTotalPages(
      filteredTemplates.length,
      MARKETPLACE_ITEMS_PER_PAGE,
    );

  const templates =
    useMemo(
      () =>
        paginateTemplates(
          filteredTemplates,
          page,
          MARKETPLACE_ITEMS_PER_PAGE,
        ),
      [
        filteredTemplates,
        page,
      ],
    );

  // =======================================================
  // Reset
  // =======================================================

  function resetFilters() {
    setSearch("");

    setCategory(
      MARKETPLACE_DEFAULT_CATEGORY,
    );

    setTab(
      MARKETPLACE_DEFAULT_TAB,
    );

    setSort(
      MARKETPLACE_DEFAULT_SORT,
    );

    setPage(1);
  }

  // =======================================================
  // Return
  // =======================================================

  return {
    // -----------------------------------------------------
    // Marketplace static metadata
    // -----------------------------------------------------

    header:
      marketplaceData.header,

    tabs:
      marketplaceData.tabs,

    filters:
      marketplaceData.filters,

    categories:
      marketplaceData.categories,

    // -----------------------------------------------------
    // Template data
    // -----------------------------------------------------

    templates,

    filteredTemplates,

    allTemplates,

    // -----------------------------------------------------
    // Loading / Error
    // -----------------------------------------------------

    isLoading,

    error,

    // -----------------------------------------------------
    // State
    // -----------------------------------------------------

    search,

    category,

    tab,

    sort,

    page,

    view,

    totalPages,

    // -----------------------------------------------------
    // Actions
    // -----------------------------------------------------

    setSearch,

    setCategory,

    setTab,

    setSort,

    setPage,

    setView,

    resetFilters,
  };
}