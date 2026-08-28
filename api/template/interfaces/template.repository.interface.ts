import type {
  Template,
  TemplateStyle,
} from "../../generated/prisma/client";

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

  // =========================
  // Template Style
  // =========================

  styleId?: string | null;

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
  slug?: string;

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

  // =========================
  // Template Style
  // =========================

  styleId?: string | null;

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
  // Template Style
  // =========================

  getStyleByTemplateId(
    templateId: string,
  ): Promise<TemplateStyle | null>;

  getStyleById(
    styleId: string,
  ): Promise<TemplateStyle | null>;

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