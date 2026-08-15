import { apiClient } from "@/lib/api-client";
import type { ApiTemplate } from "@/types/template/api-template";

// =========================
// Types
// =========================

export interface CreateTemplateData {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;

  images?: string[];

  category: string;

  tags?: string[];

  authorId: string;

  rating?: number;
  reviews?: number;
  downloads?: number;

  price: number;

  originalPrice?: number;

  featured?: boolean;
  newest?: boolean;

  stock?: number;

  license?: string;
}

export interface UpdateTemplateData {
  title?: string;
  description?: string;
  thumbnail?: string;

  images?: string[];

  category?: string;

  tags?: string[];

  rating?: number;
  reviews?: number;
  downloads?: number;

  price?: number;

  originalPrice?: number | null;

  featured?: boolean;
  newest?: boolean;

  stock?: number | null;

  license?: string | null;
}

// =========================
// Template Repository
// =========================

export const templateRepository = {
  // =========================
  // GET /templates
  // =========================

  async findAll(): Promise<ApiTemplate[]> {
    return apiClient<ApiTemplate[]>(
      "/templates",
      {
        method: "GET",
      },
    );
  },

  // =========================
  // GET /templates/:id
  // =========================

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

  // =========================
  // GET /templates/slug/:slug
  // =========================

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

  // =========================
  // GET /templates/author/:authorId
  // =========================

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

  // =========================
  // GET /templates/category/:category
  // =========================

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

  // =========================
  // Featured
  // =========================
  //
  // Backend hiện chưa có:
  // GET /templates/featured
  //
  // Vì vậy lấy toàn bộ template
  // rồi filter ở frontend.
  // =========================

  async findFeatured(): Promise<ApiTemplate[]> {
    const templates =
      await this.findAll();

    return templates.filter(
      (item) => item.featured === true,
    );
  },

  // =========================
  // Related
  // =========================
  //
  // Related template được xác định
  // dựa trên category hoặc tags.
  // =========================

  async findRelated(
    current: ApiTemplate,
    limit = 3,
  ): Promise<ApiTemplate[]> {
    const templates =
      await this.findAll();

    const currentTags =
      current.tags ?? [];

    return templates
      .filter((item) => {
        // Không lấy chính template hiện tại
        if (item.id === current.id) {
          return false;
        }

        // Cùng category
        const sameCategory =
          item.category ===
          current.category;

        // Có ít nhất một tag chung
        const sameTags =
          (item.tags ?? []).some(
            (tag) =>
              currentTags.includes(tag),
          );

        return (
          sameCategory ||
          sameTags
        );
      })
      .slice(0, limit);
  },

  // =========================
  // POST /templates
  // =========================
  //
  // CREATOR / ADMIN
  // =========================

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

  // =========================
  // PATCH /templates/:id
  // =========================
  //
  // CREATOR:
  //   chỉ sửa template của mình
  //
  // ADMIN:
  //   sửa mọi template
  //
  // Quyền thực tế được kiểm tra
  // ở backend.
  // =========================

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

  // =========================
  // DELETE /templates/:id
  // =========================
  //
  // CREATOR:
  //   chỉ xóa template của mình
  //
  // ADMIN:
  //   xóa mọi template
  // =========================

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