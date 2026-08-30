import type { ComponentType } from "react";

/* =========================================================
 * Badge
 * ========================================================= */

export interface MarketplaceBadge {
  text: string;

  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "destructive";
}

/* =========================================================
 * Author
 * ========================================================= */

export interface MarketplaceAuthor {
  id?: string;

  name: string;

  avatar?: string | null;

  verified?: boolean;
}

/* =========================================================
 * Template Style
 * ========================================================= */

export interface MarketplaceTemplateStyle {
  /**
   * ID của style
   */
  id: string;

  /**
   * Slug dùng cho URL / nhận diện style
   */
  slug: string;

  /**
   * Tên hiển thị của style
   */
  name: string;
}

/* =========================================================
 * Category
 * ========================================================= */

export interface MarketplaceCategory {
  id: string;

  label: string;
}

/* =========================================================
 * Template
 * ========================================================= */

export interface MarketplaceTemplate {
  // =========================
  // Basic information
  // =========================

  id: string;

  slug: string;

  title: string;

  description: string;

  thumbnail: string;

  // =========================
  // Images
  // =========================

  images?: string[];

  // =========================
  // Category / Tags
  // =========================

  category: string;

  tags: string[];

  // =========================
  // Author
  // =========================

  authorId: string;

  author: MarketplaceAuthor;

  // =========================
  // Style
  // =========================

  /**
   * ID của style được gán cho Template.
   *
   * null = Template không có style.
   */
  styleId?: string | null;

  /**
   * Thông tin style được backend trả về.
   *
   * null = Template không có style.
   */
  style?: MarketplaceTemplateStyle | null;

  // =========================
  // Badge
  // =========================

  badge?: MarketplaceBadge;

  // =========================
  // Statistics
  // =========================

  rating: number;

  reviews: number;

  reviewCount?: number;

  downloads: number;

  // =========================
  // Pricing
  // =========================

  price: number;

  discountPrice?: number;

  originalPrice?: number;

  // =========================
  // Status
  // =========================

  isPremium?: boolean;

  featured?: boolean;

  newest?: boolean;

  stock?: number;

  license?: string;
}

/* =========================================================
 * Marketplace
 * ========================================================= */

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

/* =========================================================
 * Props
 * ========================================================= */

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

/* =========================================================
 * Icon
 * ========================================================= */

export type MarketplaceIcon = ComponentType<{
  className?: string;
}>;

/* =========================================================
 * View / Sort / Category
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