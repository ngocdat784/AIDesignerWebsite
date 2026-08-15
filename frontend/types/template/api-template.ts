// frontend/types/template/api-template.ts

export interface ApiTemplateAuthor {
  id: string;
  name: string;
  avatar?: string | null;
}

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

  images?: string[];

  // =========================
  // Category / Tags
  // =========================

  category: string;

  tags?: string[];

  // =========================
  // Author
  // =========================

  authorId: string;

  // Backend có thể include author
  author?: ApiTemplateAuthor | null;

  // =========================
  // Statistics
  // =========================

  rating?: number;

  reviews?: number;

  downloads?: number;

  // =========================
  // Pricing
  // =========================

  price: number;

  originalPrice?: number | null;

  // =========================
  // Status
  // =========================

  featured?: boolean;

  newest?: boolean;

  stock?: number | null;

  license?: string | null;

  // =========================
  // Timestamps
  // =========================

  createdAt?: string;

  updatedAt?: string;
}