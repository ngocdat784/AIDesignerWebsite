export type TemplateLicense =
  | "Personal"
  | "Commercial"
  | string;

export interface TemplateAuthor {
  id: string;
  name: string;
  avatar?: string | null;
  verified?: boolean;
}

export interface TemplateIncludedFile {
  name: string;
  type: "file" | "folder";
}

export interface TemplateChangelog {
  version: string;
  date: string;
  changes: string[];
}

export interface Template {
  // =========================
  // Basic information
  // =========================

  id: string;

  slug: string;

  title: string;

  description: string;

  thumbnail: string;

  coverImage?: string | null;

  images: string[];

  gallery?: string[];

  // =========================
  // Category / Tags
  // =========================

  category: string;

  tags: string[];

  relatedTemplateIds?: string[];

  // =========================
  // Author
  // =========================

  authorId: string;

  author?: TemplateAuthor | null;

  // =========================
  // Technology
  // =========================

  techStack?: string[];

  // =========================
  // Detail information
  // =========================

  includedFiles?: TemplateIncludedFile[];

  features?: string[];

  installationSteps?: string[];

  requirements?: string[];

  changelog?: TemplateChangelog[];

  // =========================
  // Statistics
  // =========================

  rating?: number;

  reviews?: number;

  // Alias nếu UI cũ đang dùng reviewCount
  reviewCount?: number;

  downloads?: number;

  favorites?: number;

  views?: number;

  // =========================
  // Pricing
  // =========================

  price: number;

  originalPrice?: number | null;

  // Alias cho code cũ
  discountPrice?: number | null;

  // =========================
  // Status
  // =========================

  featured?: boolean;

  newest?: boolean;

  // Alias cho code cũ
  isFeatured?: boolean;

  isPremium?: boolean;

  status?: string;

  stock?: number | null;

  license?: TemplateLicense | null;

  // =========================
  // Demo / Version
  // =========================

  demoUrl?: string;

  version?: string;

  // =========================
  // Timestamps
  // =========================

  createdAt?: string;

  updatedAt?: string;
}