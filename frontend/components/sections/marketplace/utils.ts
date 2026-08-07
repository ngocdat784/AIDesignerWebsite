import {
  MarketplaceCategory,
  MarketplaceTemplate,
} from "./types";

/* ===========================
   Search
=========================== */

export function searchTemplates(
  templates: MarketplaceTemplate[],
  keyword: string
): MarketplaceTemplate[] {
  if (!keyword.trim()) return templates;

  const search = keyword.toLowerCase();

  return templates.filter(
    (template) =>
      template.title
        .toLowerCase()
        .includes(search) ||
      template.description
        .toLowerCase()
        .includes(search) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(search)
      ) ||
      template.author.name
        .toLowerCase()
        .includes(search)
  );
}

/* ===========================
   Category
=========================== */

export function filterByCategory(
  templates: MarketplaceTemplate[],
  category: string
): MarketplaceTemplate[] {
  if (category === "all") return templates;

  return templates.filter(
    (template) =>
      template.category === category
  );
}

/* ===========================
   Tab
=========================== */

export function filterByTab(
  templates: MarketplaceTemplate[],
  tab: string
): MarketplaceTemplate[] {
  switch (tab) {
    case "featured":
      return templates.filter(
        (template) => template.featured
      );

    case "new":
      return templates.filter(
        (template) => template.newest
      );

    default:
      return templates;
  }
}

/* ===========================
   Sort
=========================== */

export function sortTemplates(
  templates: MarketplaceTemplate[],
  sort: string
): MarketplaceTemplate[] {
  const data = [...templates];

  switch (sort) {
    case "newest":
      return data.reverse();

    case "rating":
      return data.sort(
        (a, b) => b.rating - a.rating
      );

    case "price-asc":
      return data.sort(
        (a, b) => a.price - b.price
      );

    case "price-desc":
      return data.sort(
        (a, b) => b.price - a.price
      );

    case "popular":
    default:
      return data.sort(
        (a, b) =>
          b.downloads - a.downloads
      );
  }
}

/* ===========================
   Pagination
=========================== */

export function paginateTemplates(
  templates: MarketplaceTemplate[],
  page: number,
  pageSize: number
): MarketplaceTemplate[] {
  const start = (page - 1) * pageSize;

  return templates.slice(
    start,
    start + pageSize
  );
}

export function getTotalPages(
  totalItems: number,
  pageSize: number
): number {
  return Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );
}