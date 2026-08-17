import { apiClient } from "@/lib/api-client";
import type { ApiTemplate } from "@/types/template/api-template";

// =========================
// Types
// =========================

export interface CreateTemplateData {
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

  images?: string[];

  gallery?: string[];

  // =========================
  // Category / Tags
  // =========================

  category: string;

  tags?: string[];

  relatedTemplateIds?: string[];

  // =========================
  // Technology
  // =========================

  techStack?: string[];

  // =========================
  // Detail information
  // =========================

  includedFiles?: {
    name: string;
    type: "file" | "folder";
  }[];

  features?: string[];

  installationSteps?: string[];

  requirements?: string[];

  changelog?: {
    version: string;
    date: string;
    changes: string[];
  }[];

  // =========================
  // Statistics
  // =========================

  rating?: number;

  reviews?: number;

  downloads?: number;

  favorites?: number;

  views?: number;

  // =========================
  // Pricing
  // =========================

  price: number;

  originalPrice?: number | null;

  discountPrice?: number | null;

  // =========================
  // Status
  // =========================

  featured?: boolean;

  newest?: boolean;

  isFeatured?: boolean;

  isPremium?: boolean;

  status?: string;

  stock?: number | null;

  license?: string | null;

  // =========================
  // Demo / Version
  // =========================

  demoUrl?: string;

  version?: string;
}

export interface UpdateTemplateData {
  // =========================
  // Basic information
  // =========================

  slug?: string;

  title?: string;

  description?: string;

  thumbnail?: string;

  // =========================
  // Images
  // =========================

  coverImage?: string | null;

  images?: string[];

  gallery?: string[];

  // =========================
  // Category / Tags
  // =========================

  category?: string;

  tags?: string[];

  relatedTemplateIds?: string[];

  // =========================
  // Technology
  // =========================

  techStack?: string[];

  // =========================
  // Detail information
  // =========================

  includedFiles?: {
    name: string;
    type: "file" | "folder";
  }[];

  features?: string[];

  installationSteps?: string[];

  requirements?: string[];

  changelog?: {
    version: string;
    date: string;
    changes: string[];
  }[];

  // =========================
  // Statistics
  // =========================

  rating?: number;

  reviews?: number;

  downloads?: number;

  favorites?: number;

  views?: number;

  // =========================
  // Pricing
  // =========================

  price?: number;

  originalPrice?: number | null;

  discountPrice?: number | null;

  // =========================
  // Status
  // =========================

  featured?: boolean;

  newest?: boolean;

  isFeatured?: boolean;

  isPremium?: boolean;

  status?: string;

  stock?: number | null;

  license?: string | null;

  // =========================
  // Demo / Version
  // =========================

  demoUrl?: string;

  version?: string;
}

// =========================
// Template Repository
// =========================

export const templateRepository = {
  // =========================================================
  // GET /templates
  // =========================================================

  async findAll(): Promise<ApiTemplate[]> {
    return apiClient<ApiTemplate[]>(
      "/templates",
      {
        method: "GET",
      },
    );
  },

  // =========================================================
  // GET /templates/:id
  // =========================================================

  async findById(
    id: string,
  ): Promise<ApiTemplate | null> {
    return apiClient<ApiTemplate>(
      `/templates/${encodeURIComponent(id)}`,
      {
        method: "GET",
      },
    );
  },

  // =========================================================
  // GET /templates/slug/:slug
  // =========================================================

  async findBySlug(
    slug: string,
  ): Promise<ApiTemplate | null> {
    return apiClient<ApiTemplate>(
      `/templates/slug/${encodeURIComponent(slug)}`,
      {
        method: "GET",
      },
    );
  },

  // =========================================================
  // GET /templates/author/:authorId
  // =========================================================

  async findByAuthorId(
    authorId: string,
  ): Promise<ApiTemplate[]> {
    return apiClient<ApiTemplate[]>(
      `/templates/author/${encodeURIComponent(authorId)}`,
      {
        method: "GET",
      },
    );
  },

  // =========================================================
  // GET /templates/category/:category
  // =========================================================

  async findByCategory(
    category: string,
  ): Promise<ApiTemplate[]> {
    return apiClient<ApiTemplate[]>(
      `/templates/category/${encodeURIComponent(category)}`,
      {
        method: "GET",
      },
    );
  },

  // =========================================================
  // Featured
  // =========================================================
  //
  // Backend chưa có:
  // GET /templates/featured
  //
  // Vì vậy filter ở frontend.
  // =========================================================

  async findFeatured(): Promise<ApiTemplate[]> {
    const templates =
      await this.findAll();

    return templates.filter(
      (template) =>
        template.featured === true ||
        template.isFeatured === true,
    );
  },

  // =========================================================
  // Related templates
  // =========================================================
  //
  // Ưu tiên relatedTemplateIds.
  // Nếu không có thì fallback:
  // - cùng category
  // - hoặc có tag chung
  // =========================================================

  async findRelated(
    current: ApiTemplate,
    limit = 3,
  ): Promise<ApiTemplate[]> {
    const templates =
      await this.findAll();

    // ---------------------------------------------------------
    // 1. Nếu template có relatedTemplateIds
    // ---------------------------------------------------------

    const relatedIds =
      current.relatedTemplateIds ?? [];

    if (relatedIds.length > 0) {
      const related =
        relatedIds
          .map((id) =>
            templates.find(
              (template) =>
                template.id === id,
            ),
          )
          .filter(
            (
              template,
            ): template is ApiTemplate =>
              template !== undefined,
          )
          .slice(0, limit);

      if (related.length > 0) {
        return related;
      }
    }

    // ---------------------------------------------------------
    // 2. Fallback: category + tags
    // ---------------------------------------------------------

    const currentTags =
      current.tags ?? [];

    return templates
      .filter((template) => {
        // Không lấy chính template hiện tại
        if (template.id === current.id) {
          return false;
        }

        // Cùng category
        const sameCategory =
          template.category ===
          current.category;

        // Có tag chung
        const sameTags =
          (template.tags ?? []).some(
            (tag) =>
              currentTags.includes(tag),
          );

        return (
          sameCategory ||
          sameTags
        );
      })
      .sort((a, b) => {
        // Ưu tiên cùng category
        const aSameCategory =
          a.category ===
          current.category
            ? 1
            : 0;

        const bSameCategory =
          b.category ===
          current.category
            ? 1
            : 0;

        if (
          aSameCategory !==
          bSameCategory
        ) {
          return (
            bSameCategory -
            aSameCategory
          );
        }

        // Sau đó ưu tiên rating
        return (
          (b.rating ?? 0) -
          (a.rating ?? 0)
        );
      })
      .slice(0, limit);
  },

  // =========================================================
  // POST /templates
  // =========================================================
  //
  // CREATOR / ADMIN
  //
  // authorId KHÔNG gửi từ frontend.
  // Backend tự lấy:
  //
  // authorId = CurrentUser.id
  // =========================================================

  async create(
    data: CreateTemplateData,
  ): Promise<ApiTemplate> {
    return apiClient<ApiTemplate>(
      "/templates",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  },

  // =========================================================
  // PATCH /templates/:id
  // =========================================================
  //
  // CREATOR:
  //   chỉ sửa template của mình
  //
  // ADMIN:
  //   sửa mọi template
  //
  // Quyền được kiểm tra ở backend.
  // =========================================================

  async update(
    id: string,
    data: UpdateTemplateData,
  ): Promise<ApiTemplate> {
    return apiClient<ApiTemplate>(
      `/templates/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );
  },

  // =========================================================
  // DELETE /templates/:id
  // =========================================================
  //
  // CREATOR:
  //   chỉ xóa template của mình
  //
  // ADMIN:
  //   xóa mọi template
  // =========================================================

  async delete(
    id: string,
  ): Promise<ApiTemplate> {
    return apiClient<ApiTemplate>(
      `/templates/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
      },
    );
  },
};