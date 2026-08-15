"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { SortOption } from "@/lib/sorting/template.sort";

import { templateService } from "@/services/template.service";

import { filterTemplates } from "@/lib/filters/template.filter";
import { sortTemplates } from "@/lib/sorting/template.sort";

import { paginate } from "@/lib/pagination/paginate";
import { getTotalPages } from "@/lib/pagination/getTotalPages";

import {
  DEFAULT_PAGE_SIZE,
  PageSize,
} from "@/lib/constants/page-size";

import {
  DEFAULT_VIEW_MODE,
  ViewMode,
} from "@/lib/constants/view-mode";

import type { Template } from "@/types/template/template";

export type MarketplaceQueryKey =
  | "search"
  | "category"
  | "sort"
  | "page"
  | "view"
  | "pageSize";

export function useMarketplace() {
  const router = useRouter();
  const params = useSearchParams();

  // =========================
  // Query params
  // =========================

  const search = params.get("search") ?? "";

  const category =
    params.get("category") ?? "All";

  const sort =
    params.get("sort") ?? "latest";

  const page = Number(
    params.get("page") ?? "1",
  );

  const pageSize =
    Number(params.get("pageSize")) ||
    DEFAULT_PAGE_SIZE;

  const view =
    params.get("view") ??
    DEFAULT_VIEW_MODE;

  // =========================
  // Templates from API
  // =========================

  const [allTemplates, setAllTemplates] =
    useState<Template[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTemplates() {
      try {
        setIsLoading(true);
        setError(null);

        const result =
          await templateService.getAll();

        if (!cancelled) {
          setAllTemplates(result);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Không thể tải danh sách template.",
          );

          setAllTemplates([]);
        }
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

  // =========================
  // Filter
  // =========================

  const filteredTemplates =
    useMemo(() => {
      return filterTemplates(
        allTemplates,
        {
          search,
          category,
        },
      );
    }, [
      allTemplates,
      search,
      category,
    ]);

  // =========================
  // Sort
  // =========================

  const sortedTemplates =
    useMemo(() => {
      return sortTemplates(
        filteredTemplates,
        sort as SortOption,
      );
    }, [
      filteredTemplates,
      sort,
    ]);

  // =========================
  // Pagination
  // =========================

  const templates = useMemo(() => {
    return paginate(
      sortedTemplates,
      page,
      pageSize,
    );
  }, [
    sortedTemplates,
    page,
    pageSize,
  ]);

  const totalTemplates =
    filteredTemplates.length;

  const totalPages =
    getTotalPages(
      totalTemplates,
      pageSize,
    );

  const startIndex =
    totalTemplates === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const endIndex = Math.min(
    page * pageSize,
    totalTemplates,
  );

  // =========================
  // Query update
  // =========================

  function updateQuery(
    key: MarketplaceQueryKey,
    value?: string | null,
  ) {
    const query =
      new URLSearchParams(
        params.toString(),
      );

    if (
      !value ||
      value.trim() === ""
    ) {
      query.delete(key);
    } else {
      query.set(key, value);
    }

    if (key !== "page") {
      query.set("page", "1");
    }

    router.push(
      `/marketplace?${query.toString()}`,
    );
  }

  // =========================
  // Search
  // =========================

  function setSearch(value: string) {
    updateQuery(
      "search",
      value,
    );
  }

  // =========================
  // Category
  // =========================

  function setCategory(value: string) {
    updateQuery(
      "category",
      value,
    );
  }

  // =========================
  // Sort
  // =========================

  function setSort(
    value: SortOption,
  ) {
    updateQuery(
      "sort",
      value,
    );
  }

  // =========================
  // Page
  // =========================

  function setPage(value: number) {
    updateQuery(
      "page",
      value.toString(),
    );
  }

  // =========================
  // Clear filters
  // =========================

  function clearSearch() {
    updateQuery(
      "search",
      "",
    );
  }

  function clearCategory() {
    updateQuery(
      "category",
      "All",
    );
  }

  function clearSort() {
    updateQuery(
      "sort",
      "latest",
    );
  }

  function clearAllFilters() {
    router.push(
      "/marketplace",
    );
  }

  // =========================
  // Page size
  // =========================

  function setPageSize(
    value: PageSize,
  ) {
    updateQuery(
      "pageSize",
      value.toString(),
    );
  }

  // =========================
  // View mode
  // =========================

  function setView(
    value: ViewMode,
  ) {
    updateQuery(
      "view",
      value,
    );
  }

  // =========================
  // Return
  // =========================

  return {
    search,
    category,
    sort,
    page,

    templates,

    totalTemplates,
    totalPages,

    startIndex,
    endIndex,

    pageSize,
    view,

    isLoading,
    error,

    setPageSize,

    setSearch,
    setCategory,
    setSort,
    setPage,
    setView,

    clearSearch,
    clearCategory,
    clearSort,
    clearAllFilters,
  };
}