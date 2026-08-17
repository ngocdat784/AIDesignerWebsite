// frontend/types/template/template.ts

// =========================
// License
// =========================

export type TemplateLicense =
  | "Personal"
  | "Commercial"
  | string;

// =========================
// Author
// =========================

export interface TemplateAuthor {
  id: string;
  name: string;
  avatar?: string | null;
  verified?: boolean;
}

// =========================
// Included File
// =========================

export interface TemplateIncludedFile {
  name: string;
  type: "file" | "folder";
}

// =========================
// Changelog
// =========================

export interface TemplateChangelog {
  version: string;
  date: string;
  changes: string[];
}

// =========================
// Template
// =========================

export interface Template {
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

  coverImage?: string | null;

  images: string[];

  gallery: string[];

  // =========================
  // Category / Tags
  // =========================

  category: string;

  tags: string[];

  relatedTemplateIds: string[];

  // =========================
  // Author
  // =========================

  authorId: string;

  author?: TemplateAuthor | null;

  // =========================
  // Technology
  // =========================

  techStack: string[];

  // =========================
  // Detail information
  // =========================

  includedFiles: TemplateIncludedFile[];

  features: string[];

  installationSteps: string[];

  requirements: string[];

  changelog: TemplateChangelog[];

  // =========================
  // Statistics
  // =========================

  rating: number;

  reviews: number;

  /**
   * Alias cho code/UI cũ.
   *
   * Backend sử dụng `reviews`.
   */
  reviewCount?: number;

  downloads: number;

  favorites: number;

  views: number;

  // =========================
  // Pricing
  // =========================

  price: number;

  originalPrice?: number | null;

  /**
   * Alias cho code/UI cũ.
   *
   * Backend hiện có `discountPrice`.
   */
  discountPrice?: number | null;

  // =========================
  // Status
  // =========================

  featured: boolean;

  newest: boolean;

  /**
   * Alias cho code/UI cũ.
   *
   * Backend hiện có cả `featured` và `isFeatured`.
   */
  isFeatured: boolean;

  isPremium: boolean;

  status: string;

  stock?: number | null;

  license?: TemplateLicense | null;

  // =========================
  // Demo / Version
  // =========================

  demoUrl?: string | null;

  version?: string | null;

  // =========================
  // Timestamps
  // =========================

  createdAt: string;

  updatedAt: string;
}