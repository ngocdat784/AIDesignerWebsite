import type { ComponentType } from "react";

export interface MarketplaceBadge {
  text: string;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "destructive";
}

export interface MarketplaceAuthor {
  name: string;
  avatar: string;
  verified?: boolean;
}

export interface MarketplaceCategory {
  id: string;
  label: string;
}

export interface MarketplaceTemplate {
  id: string;

  slug: string;

  title: string;

  description: string;

  thumbnail: string;

  images?: string[];

  category: string;

  tags: string[];

  authorId: string;

  author: MarketplaceAuthor;

  badge?: MarketplaceBadge;

  rating: number;

  reviews: number;

  downloads: number;

  price: number;

  originalPrice?: number;

  featured?: boolean;

  newest?: boolean;

  stock?: number;

  license?: string;
}

export interface MarketplaceTab {
  id: string;

  label: string;

  count?: number;
}

export interface MarketplaceFilterOption {
  label: string;

  value: string;
}

export interface MarketplaceFilter {
  title: string;

  options: MarketplaceFilterOption[];
}

export interface MarketplaceButton {
  text: string;

  href: string;
}

export interface MarketplaceHeaderData {
  badge?: string;

  title: string;

  highlight?: string;

  description: string;

  action?: MarketplaceButton;
}

export interface MarketplaceData {
  header: MarketplaceHeaderData;

  tabs: MarketplaceTab[];

  categories: MarketplaceCategory[];

  filters: MarketplaceFilter[];

  templates: MarketplaceTemplate[];
}

export interface MarketplaceSearchProps {
  value: string;

  onChange: (value: string) => void;
}

export interface MarketplacePaginationProps {
  page: number;

  totalPages: number;

  onPageChange: (page: number) => void;
}

export interface MarketplaceLoadingProps {
  count?: number;
}

export interface MarketplaceEmptyProps {
  title?: string;

  description?: string;
}

export interface MarketplaceViewProps {
  templates: MarketplaceTemplate[];
}

export interface TemplateCardProps {
  template: MarketplaceTemplate;
}

export interface TemplateListCardProps {
  template: MarketplaceTemplate;
}

export type MarketplaceIcon = ComponentType<{
  className?: string;
}>;
/* =========================================================
 * Primitive Types
 * ========================================================= */

export type MarketplaceView =
  | "grid"
  | "list";

export type MarketplaceSort =
  | "popular"
  | "newest"
  | "rating"
  | "price-asc"
  | "price-desc";

export type MarketplaceCategoryId =
  | "all"
  | string;

export type MarketplaceTabId =
  | "all"
  | string;