import { templateRepository } from "@/repositories/template.repository";

import type { ApiTemplate } from "@/types/template/api-template";
import type { Template } from "@/types/template/template";

// =========================
// API → Frontend Mapper
// =========================

function mapApiTemplateToTemplate(
  item: ApiTemplate,
): Template {
  return {
    // =========================
    // Basic information
    // =========================

    id: item.id,

    slug: item.slug,

    title: item.title,

    description: item.description,

    thumbnail: item.thumbnail,

    images: item.images ?? [],

    // =========================
    // Category / Tags
    // =========================

    category: item.category,

    tags: item.tags ?? [],

    // =========================
    // Author
    // =========================

    authorId: item.authorId,

    author: item.author
      ? {
          id: item.author.id,

          name: item.author.name,

          avatar:
            item.author.avatar ?? null,
        }
      : null,

    // =========================
    // Statistics
    // =========================

    rating: item.rating ?? 0,

    reviews: item.reviews ?? 0,

    downloads:
      item.downloads ?? 0,

    // =========================
    // Pricing
    // =========================

    price: item.price,

    originalPrice:
      item.originalPrice ?? null,

    // =========================
    // Status
    // =========================

    featured:
      item.featured ?? false,

    newest:
      item.newest ?? false,

    stock:
      item.stock ?? null,

    license:
      item.license ?? null,

    // =========================
    // Timestamps
    // =========================

    createdAt:
      item.createdAt,

    updatedAt:
      item.updatedAt,
  };
}

// =========================
// Template Service
// =========================

export const templateService = {
  // =========================
  // Get all
  // =========================

  async getAll(): Promise<Template[]> {
    const result =
      await templateRepository.findAll();

    return result.map(
      mapApiTemplateToTemplate,
    );
  },

  // =========================
  // Get featured
  // =========================

  async getFeatured(): Promise<Template[]> {
    const result =
      await templateRepository.findFeatured();

    return result.map(
      mapApiTemplateToTemplate,
    );
  },

  // =========================
  // Get by ID
  // =========================

  async getById(
    id: string,
  ): Promise<Template | null> {
    const result =
      await templateRepository.findById(id);

    if (!result) {
      return null;
    }

    return mapApiTemplateToTemplate(
      result,
    );
  },

  // =========================
  // Get by slug
  // =========================

  async getBySlug(
    slug: string,
  ): Promise<Template | null> {
    const result =
      await templateRepository.findBySlug(
        slug,
      );

    if (!result) {
      return null;
    }

    return mapApiTemplateToTemplate(
      result,
    );
  },

  // =========================
  // Get by author
  // =========================

  async getByAuthorId(
    authorId: string,
  ): Promise<Template[]> {
    const result =
      await templateRepository.findByAuthorId(
        authorId,
      );

    return result.map(
      mapApiTemplateToTemplate,
    );
  },

  // =========================
  // Get by category
  // =========================

  async getByCategory(
    category: string,
  ): Promise<Template[]> {
    const result =
      await templateRepository.findByCategory(
        category,
      );

    return result.map(
      mapApiTemplateToTemplate,
    );
  },

  // =========================
  // Related
  // =========================

  async getRelated(
    template: Template,
    limit = 3,
  ): Promise<Template[]> {
    const result =
      await templateRepository.findRelated(
        template,
        limit,
      );

    return result.map(
      mapApiTemplateToTemplate,
    );
  },
};