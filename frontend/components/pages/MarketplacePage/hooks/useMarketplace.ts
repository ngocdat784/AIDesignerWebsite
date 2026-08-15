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

import type {
  MarketplaceTemplate,
} from "@/components/sections/marketplace/types";

export type MarketplaceQueryKey =
  | "search"
  | "category"
  | "sort"
  | "page"
  | "view"
  | "pageSize";

/**
 * =========================================================
 * Template → MarketplaceTemplate
 * =========================================================
 *
 * Template:
 *   Model dữ liệu chính của frontend.
 *
 * MarketplaceTemplate:
 *   Model dành riêng cho UI Marketplace.
 *
 * Không dùng MarketplaceTemplate làm nguồn dữ liệu chính.
 */
function toMarketplaceTemplate(
  template: Template,
): MarketplaceTemplate {
  return {
    // =========================
    // Basic information
    // =========================

    id: template.id,

    slug: template.slug,

    title: template.title,

    description: template.description,

    thumbnail: template.thumbnail,

    images:
      template.images ?? [],

    // =========================
    // Category / Tags
    // =========================

    category:
      template.category,

    tags:
      template.tags ?? [],

    // =========================
    // Author
    // =========================

    authorId:
      template.authorId,

    author: {
      name:
        template.author?.name ??
        "Unknown Author",

      avatar:
        template.author?.avatar ??
        "/avatars/default.png",

      verified:
        false,
    },

    // =========================
    // Statistics
    // =========================

    rating:
      template.rating ?? 0,

    reviews:
      template.reviews ?? 0,

    downloads:
      template.downloads ?? 0,

    // =========================
    // Pricing
    // =========================

    price:
      template.price,

    /**
     * discountPrice:
     *
     * Không lấy template.price.
     *
     * Nếu Template có discountPrice thì dùng nó.
     * Nếu không có thì undefined.
     *
     * Dùng ?? để chuyển null → undefined.
     */
    discountPrice:
      template.discountPrice ??
      undefined,

    /**
     * originalPrice:
     *
     * Template có thể trả null.
     * MarketplaceTemplate chỉ nhận number | undefined.
     */
    originalPrice:
      template.originalPrice ??
      undefined,

    // =========================
    // Status
    // =========================

    featured:
      template.featured ??
      false,

    newest:
      template.newest ??
      false,

    stock:
      template.stock ??
      undefined,

    license:
      template.license ??
      undefined,
  };
}

export function useMarketplace() {
  const router =
    useRouter();

  const params =
    useSearchParams();

  // ========================================================
  // Query params
  // ========================================================

  const search =
    params.get("search") ?? "";

  const category =
    params.get("category") ??
    "All";

  const sort =
    params.get("sort") ??
    "latest";

  const page = Math.max(
    1,
    Number(
      params.get("page") ??
      "1",
    ),
  );

  const pageSize =
    Number(
      params.get("pageSize"),
    ) ||
    DEFAULT_PAGE_SIZE;

  const view =
    params.get("view") ??
    DEFAULT_VIEW_MODE;

  // ========================================================
  // Templates from API
  // ========================================================

  const [
    allTemplates,
    setAllTemplates,
  ] = useState<Template[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  // ========================================================
  // Load templates
  // ========================================================

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

        setAllTemplates(
          result,
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

  // ========================================================
  // Filter
  // ========================================================
  //
  // Template[]
  //      ↓
  // filterTemplates
  //      ↓
  // Template[]
  //
  // Không mapping sang MarketplaceTemplate ở đây.
  // ========================================================

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

  // ========================================================
  // Sort
  // ========================================================
  //
  // Template[]
  //      ↓
  // sortTemplates
  //      ↓
  // Template[]
  // ========================================================

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

  // ========================================================
  // Pagination
  // ========================================================
  //
  // Template[]
  //      ↓
  // paginate
  //      ↓
  // Template[]
  // ========================================================

  const paginatedTemplates =
    useMemo(() => {
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

  // ========================================================
  // Mapping
  // ========================================================
  //
  // Chỉ mapping ở cuối pipeline.
  //
  // Template[]
  //      ↓
  // MarketplaceTemplate[]
  //
  // Điều này giúp:
  //
  // - filterTemplates vẫn dùng Template[]
  // - sortTemplates vẫn dùng Template[]
  // - paginate vẫn dùng Template[]
  // - Marketplace UI nhận MarketplaceTemplate[]
  // ========================================================

  const templates =
    useMemo(() => {
      return paginatedTemplates.map(
        toMarketplaceTemplate,
      );
    }, [
      paginatedTemplates,
    ]);

  // ========================================================
  // Statistics
  // ========================================================

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
      : (page - 1) *
          pageSize +
        1;

  const endIndex =
    Math.min(
      page * pageSize,
      totalTemplates,
    );

  // ========================================================
  // Query update
  // ========================================================

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
      query.set(
        key,
        value,
      );
    }

    /**
     * Khi thay đổi filter/sort/search/pageSize/view,
     * quay lại page 1.
     */
    if (key !== "page") {
      query.set(
        "page",
        "1",
      );
    }

    const queryString =
      query.toString();

    router.push(
      queryString
        ? `/marketplace?${queryString}`
        : "/marketplace",
    );
  }

  // ========================================================
  // Search
  // ========================================================

  function setSearch(
    value: string,
  ) {
    updateQuery(
      "search",
      value,
    );
  }

  // ========================================================
  // Category
  // ========================================================

  function setCategory(
    value: string,
  ) {
    updateQuery(
      "category",
      value,
    );
  }

  // ========================================================
  // Sort
  // ========================================================

  function setSort(
    value: SortOption,
  ) {
    updateQuery(
      "sort",
      value,
    );
  }

  // ========================================================
  // Page
  // ========================================================

  function setPage(
    value: number,
  ) {
    updateQuery(
      "page",
      value.toString(),
    );
  }

  // ========================================================
  // Clear filters
  // ========================================================

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

  // ========================================================
  // Page size
  // ========================================================

  function setPageSize(
    value: PageSize,
  ) {
    updateQuery(
      "pageSize",
      value.toString(),
    );
  }

  // ========================================================
  // View mode
  // ========================================================

  function setView(
    value: ViewMode,
  ) {
    updateQuery(
      "view",
      value,
    );
  }

  // ========================================================
  // Return
  // ========================================================

  return {
    // =========================
    // Query state
    // =========================

    search,

    category,

    sort,

    page,

    pageSize,

    view,

    // =========================
    // Templates
    // =========================

    /**
     * Đây là MarketplaceTemplate[].
     *
     * Component Marketplace có thể nhận trực tiếp.
     */
    templates,

    /**
     * Số lượng Template sau filter,
     * trước pagination.
     */
    totalTemplates,

    totalPages,

    startIndex,

    endIndex,

    // =========================
    // Loading / Error
    // =========================

    isLoading,

    error,

    // =========================
    // Actions
    // =========================

    setSearch,

    setCategory,

    setSort,

    setPage,

    setPageSize,

    setView,

    clearSearch,

    clearCategory,

    clearSort,

    clearAllFilters,
  };
}