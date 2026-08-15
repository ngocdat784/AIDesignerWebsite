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

    coverImage:
      item.coverImage ?? null,

    images:
      item.images ?? [],

    gallery:
      item.gallery ??
      item.images ??
      [],

    // =========================
    // Category / Tags
    // =========================

    category: item.category,

    tags:
      item.tags ?? [],

    relatedTemplateIds:
      item.relatedTemplateIds ?? [],

    // =========================
    // Author
    // =========================

    authorId:
      item.authorId,

    author: item.author
      ? {
          id: item.author.id,

          name: item.author.name,

          avatar:
            item.author.avatar ?? null,

          verified:
            item.author.verified ?? false,
        }
      : null,

    // =========================
    // Technology
    // =========================

    techStack:
      item.techStack ?? [],

    // =========================
    // Detail information
    // =========================

    includedFiles:
      item.includedFiles ?? [],

    features:
      item.features ?? [],

    installationSteps:
      item.installationSteps ?? [],

    requirements:
      item.requirements ?? [],

    changelog:
      item.changelog ?? [],

    // =========================
    // Statistics
    // =========================

    rating:
      item.rating ?? 0,

    reviews:
      item.reviews ?? 0,

    reviewCount:
      item.reviewCount ??
      item.reviews ??
      0,

    downloads:
      item.downloads ?? 0,

    favorites:
      item.favorites ?? 0,

    views:
      item.views ?? 0,

    // =========================
    // Pricing
    // =========================

    price:
      item.price,

    originalPrice:
      item.originalPrice ?? null,

    discountPrice:
      item.discountPrice ??
      item.originalPrice ??
      null,

    // =========================
    // Status
    // =========================

    featured:
      item.featured ??
      item.isFeatured ??
      false,

    newest:
      item.newest ??
      false,

    isFeatured:
      item.isFeatured ??
      item.featured ??
      false,

    isPremium:
      item.isPremium ??
      false,

    status:
      item.status,

    stock:
      item.stock ?? null,

    license:
      item.license ?? null,

    // =========================
    // Demo / Version
    // =========================

    demoUrl:
      item.demoUrl,

    version:
      item.version,

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