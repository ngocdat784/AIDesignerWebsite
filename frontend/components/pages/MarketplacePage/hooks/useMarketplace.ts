"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { SortOption } from "@/lib/sorting/template.sort";
import { templateService } from "@/services/template.service";

import { filterTemplates } from "@/lib/filters/template.filter";

import { sortTemplates } from "@/lib/sorting/template.sort";

import { paginate } from "@/lib/pagination/paginate";

import { getTotalPages } from "@/lib/pagination/getTotalPages";

import { PAGE_SIZE } from "@/lib/constants/pagination";

export type MarketplaceQueryKey =
  | "search"
  | "category"
  | "sort"
  | "page";

export function useMarketplace() {
  const router = useRouter();
  const params = useSearchParams();

  const search = params.get("search") ?? "";
  const category = params.get("category") ?? "All";
  const sort = params.get("sort") ?? "latest";
  const page = Number(params.get("page") ?? "1");
  const allTemplates = templateService.getAll();

const filteredTemplates = filterTemplates(allTemplates, {
  search,
  category,
});

const sortedTemplates = sortTemplates(
  filteredTemplates,
  sort as any
);

const templates = paginate(
  sortedTemplates,
  page,
  PAGE_SIZE
);

const totalTemplates = filteredTemplates.length;

const totalPages = getTotalPages(
  totalTemplates,
  PAGE_SIZE
);
const startIndex =
  totalTemplates === 0
    ? 0
    : (page - 1) * PAGE_SIZE + 1;

const endIndex = Math.min(
  page * PAGE_SIZE,
  totalTemplates
);

  function updateQuery(
    key: MarketplaceQueryKey,
    value?: string | null
  ) {
    const query = new URLSearchParams(params.toString());

    if (!value || value.trim() === "") {
      query.delete(key);
    } else {
      query.set(key, value);
    }

    if (key !== "page") {
      query.set("page", "1");
    }

    router.push(`/marketplace?${query.toString()}`);
  }

  function setSearch(value: string) {
    updateQuery("search", value);
  }

  function setCategory(value: string) {
    updateQuery("category", value);
  }

  function setSort(value: SortOption) {
  updateQuery("sort", value);
}

  function setPage(value: number) {
    updateQuery("page", value.toString());
  }
function clearSearch() {
  updateQuery("search", "");
}

function clearCategory() {
  updateQuery("category", "All");
}

function clearSort() {
  updateQuery("sort", "latest");
}
function clearAllFilters() {
  router.push("/marketplace");
}
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

  setSearch,
  setCategory,
  setSort,
  setPage,

  clearSearch,
  clearCategory,
  clearSort,
  clearAllFilters,
};
}