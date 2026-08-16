import type { Template } from "../../generated/prisma/client";

// =========================
// Create Template
// =========================

export interface CreateTemplateData {
  id: string;
  slug: string;

  title: string;
  description: string;

  thumbnail: string;

  coverImage?: string | null;
  images?: string[];
  gallery?: string[];

  category: string;
  tags?: string[];

  relatedTemplateIds?: string[];

  authorId: string;

  techStack?: string[];

  includedFiles?: unknown;
  features?: string[];
  installationSteps?: string[];
  requirements?: string[];
  changelog?: unknown;

  rating?: number;
  reviews?: number;
  downloads?: number;
  favorites?: number;
  views?: number;

  price: number;
  originalPrice?: number | null;
  discountPrice?: number | null;

  featured?: boolean;
  newest?: boolean;
  isFeatured?: boolean;
  isPremium?: boolean;

  status?: string;

  stock?: number | null;
  license?: string | null;

  demoUrl?: string;
  version?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// =========================
// Update Template
// =========================

export interface UpdateTemplateData {
  title?: string;
  description?: string;

  thumbnail?: string;

  coverImage?: string | null;
  images?: string[];
  gallery?: string[];

  category?: string;
  tags?: string[];

  relatedTemplateIds?: string[];

  techStack?: string[];

  includedFiles?: unknown;
  features?: string[];
  installationSteps?: string[];
  requirements?: string[];
  changelog?: unknown;

  rating?: number;
  reviews?: number;
  downloads?: number;
  favorites?: number;
  views?: number;

  price?: number;
  originalPrice?: number | null;
  discountPrice?: number | null;

  featured?: boolean;
  newest?: boolean;
  isFeatured?: boolean;
  isPremium?: boolean;

  status?: string;

  stock?: number | null;
  license?: string | null;

  demoUrl?: string;
  version?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// =========================
// Template Repository Interface
// =========================

export interface TemplateRepositoryInterface {
  // =========================
  // Query
  // =========================

  getAll(): Promise<Template[]>;

  getById(
    id: string,
  ): Promise<Template | null>;

  getBySlug(
    slug: string,
  ): Promise<Template | null>;

  getByAuthorId(
    authorId: string,
  ): Promise<Template[]>;

  getByCategory(
    category: string,
  ): Promise<Template[]>;

  // =========================
  // Commands
  // =========================

  create(
    data: CreateTemplateData,
  ): Promise<Template>;

  update(
    id: string,
    data: UpdateTemplateData,
  ): Promise<Template>;

  delete(
    id: string,
  ): Promise<Template>;
}