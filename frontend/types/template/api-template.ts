// frontend/types/template/api-template.ts

// =========================
// Author
// =========================

export interface ApiTemplateAuthor {
  id: string;
  name: string;
  avatar?: string | null;
  email?: string;
  role?: "USER" | "CREATOR" | "ADMIN";
}

// =========================
// Included File
// =========================

export interface ApiTemplateIncludedFile {
  name: string;
  type: "file" | "folder";
}

// =========================
// Changelog
// =========================

export interface ApiTemplateChangelog {
  version: string;
  date: string;
  changes: string[];
}

// =========================
// Template
// =========================

export interface ApiTemplate {
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

  author?: ApiTemplateAuthor | null;

  // =========================
  // Technology
  // =========================

  techStack: string[];

  // =========================
  // Detail information
  // =========================

  includedFiles?: ApiTemplateIncludedFile[] | null;

  features: string[];

  installationSteps: string[];

  requirements: string[];

  changelog?: ApiTemplateChangelog[] | null;

  // =========================
  // Statistics
  // =========================

  rating: number;

  reviews: number;

  downloads: number;

  favorites: number;

  views: number;

  // =========================
  // Pricing
  // =========================

  price: number;

  originalPrice?: number | null;

  discountPrice?: number | null;

  // =========================
  // Status
  // =========================

  featured: boolean;

  newest: boolean;

  isFeatured: boolean;

  isPremium: boolean;

  status: string;

  stock?: number | null;

  license?: string | null;

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