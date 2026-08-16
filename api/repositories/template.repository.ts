import { Injectable, Inject } from "@nestjs/common";

import { Prisma } from "../generated/prisma/client";

import { DatabaseService } from "../database/database.service";

import {
  TemplateRepositoryInterface,
  CreateTemplateData,
  UpdateTemplateData,
} from "../template/interfaces/template.repository.interface";

import { handlePrismaException } from "../common/exceptions/prisma.exception";

@Injectable()
export class TemplateRepository
  implements TemplateRepositoryInterface
{
  constructor(
    @Inject(DatabaseService)
    private readonly database: DatabaseService,
  ) {}

  // =========================
  // Query
  // =========================

  async getAll() {
    try {
      return await this.database.template.findMany({
        orderBy: {
          createdAt: "desc",
        },

        include: {
          author: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  // =========================
  // GET /templates/:id
  // =========================

  async getById(id: string) {
    try {
      return await this.database.template.findUnique({
        where: {
          id,
        },

        include: {
          author: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  // =========================
  // GET /templates/slug/:slug
  // =========================

  async getBySlug(slug: string) {
    try {
      return await this.database.template.findUnique({
        where: {
          slug,
        },

        include: {
          author: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  // =========================
  // GET /templates/author/:authorId
  // =========================

  async getByAuthorId(authorId: string) {
    try {
      return await this.database.template.findMany({
        where: {
          authorId,
        },

        orderBy: {
          createdAt: "desc",
        },

        include: {
          author: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  // =========================
  // GET /templates/category/:category
  // =========================

  async getByCategory(category: string) {
    try {
      return await this.database.template.findMany({
        where: {
          category,
        },

        orderBy: {
          createdAt: "desc",
        },

        include: {
          author: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  // =========================
  // Create
  // =========================

  async create(
    data: CreateTemplateData,
  ) {
    try {
      return await this.database.template.create({
        data: {
          // =========================
          // Basic
          // =========================

          id: data.id,
          slug: data.slug,

          title: data.title,
          description: data.description,

          thumbnail: data.thumbnail,

          // =========================
          // Images
          // =========================

          coverImage:
            data.coverImage ?? null,

          images:
            data.images ?? [],

          gallery:
            data.gallery ?? [],

          // =========================
          // Category / Tags
          // =========================

          category: data.category,

          tags:
            data.tags ?? [],

          relatedTemplateIds:
            data.relatedTemplateIds ?? [],

          // =========================
          // Author
          // =========================

          authorId: data.authorId,

          // =========================
          // Technology
          // =========================

          techStack:
            data.techStack ?? [],

          // =========================
          // Detail
          // =========================

          includedFiles:
            data.includedFiles === null
              ? Prisma.JsonNull
              : (data.includedFiles ?? undefined),

          features:
            data.features ?? [],

          installationSteps:
            data.installationSteps ?? [],

          requirements:
            data.requirements ?? [],

          changelog:
            data.changelog === null
              ? Prisma.JsonNull
              : (data.changelog ?? undefined),

          // =========================
          // Statistics
          // =========================

          rating:
            data.rating ?? 0,

          reviews:
            data.reviews ?? 0,

          downloads:
            data.downloads ?? 0,

          favorites:
            data.favorites ?? 0,

          views:
            data.views ?? 0,

          // =========================
          // Pricing
          // =========================

          price: data.price,

          originalPrice:
            data.originalPrice ?? null,

          discountPrice:
            data.discountPrice ?? null,

          // =========================
          // Status
          // =========================

          featured:
            data.featured ?? false,

          newest:
            data.newest ?? false,

          isFeatured:
            data.isFeatured ?? false,

          isPremium:
            data.isPremium ?? false,

          status:
            data.status ?? "published",

          stock:
            data.stock ?? null,

          license:
            data.license ?? null,

          // =========================
          // Demo / Version
          // =========================

          demoUrl:
            data.demoUrl ?? undefined,

          version:
            data.version ?? undefined,

          createdAt:
            data.createdAt ?? undefined,

          updatedAt:
            data.updatedAt ?? undefined,
        },

        include: {
          author: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  // =========================
  // Update
  // =========================

  async update(
    id: string,
    data: UpdateTemplateData,
  ) {
    try {
      return await this.database.template.update({
        where: {
          id,
        },

        data: {
          // =========================
          // Basic
          // =========================

          ...(data.title !== undefined && {
            title: data.title,
          }),

          ...(data.description !== undefined && {
            description: data.description,
          }),

          ...(data.thumbnail !== undefined && {
            thumbnail: data.thumbnail,
          }),

          // =========================
          // Images
          // =========================

          ...(data.coverImage !== undefined && {
            coverImage: data.coverImage,
          }),

          ...(data.images !== undefined && {
            images: data.images,
          }),

          ...(data.gallery !== undefined && {
            gallery: data.gallery,
          }),

          // =========================
          // Category / Tags
          // =========================

          ...(data.category !== undefined && {
            category: data.category,
          }),

          ...(data.tags !== undefined && {
            tags: data.tags,
          }),

          ...(data.relatedTemplateIds !== undefined && {
            relatedTemplateIds:
              data.relatedTemplateIds,
          }),

          // =========================
          // Technology
          // =========================

          ...(data.techStack !== undefined && {
            techStack: data.techStack,
          }),

          // =========================
          // Detail
          // =========================

          ...(data.includedFiles !== undefined && {
            includedFiles:
              data.includedFiles === null
                ? Prisma.JsonNull
                : data.includedFiles,
          }),

          ...(data.features !== undefined && {
            features: data.features,
          }),

          ...(data.installationSteps !== undefined && {
            installationSteps:
              data.installationSteps,
          }),

          ...(data.requirements !== undefined && {
            requirements:
              data.requirements,
          }),

          ...(data.changelog !== undefined && {
            changelog:
              data.changelog === null
                ? Prisma.JsonNull
                : data.changelog,
          }),

          // =========================
          // Statistics
          // =========================

          ...(data.rating !== undefined && {
            rating: data.rating,
          }),

          ...(data.reviews !== undefined && {
            reviews: data.reviews,
          }),

          ...(data.downloads !== undefined && {
            downloads: data.downloads,
          }),

          ...(data.favorites !== undefined && {
            favorites: data.favorites,
          }),

          ...(data.views !== undefined && {
            views: data.views,
          }),

          // =========================
          // Pricing
          // =========================

          ...(data.price !== undefined && {
            price: data.price,
          }),

          ...(data.originalPrice !== undefined && {
            originalPrice:
              data.originalPrice,
          }),

          ...(data.discountPrice !== undefined && {
            discountPrice:
              data.discountPrice,
          }),

          // =========================
          // Status
          // =========================

          ...(data.featured !== undefined && {
            featured: data.featured,
          }),

          ...(data.newest !== undefined && {
            newest: data.newest,
          }),

          ...(data.isFeatured !== undefined && {
            isFeatured:
              data.isFeatured,
          }),

          ...(data.isPremium !== undefined && {
            isPremium:
              data.isPremium,
          }),

          ...(data.status !== undefined && {
            status: data.status,
          }),

          ...(data.stock !== undefined && {
            stock: data.stock,
          }),

          ...(data.license !== undefined && {
            license: data.license,
          }),

          // =========================
          // Demo / Version
          // =========================

          ...(data.demoUrl !== undefined && {
            demoUrl: data.demoUrl,
          }),

          ...(data.version !== undefined && {
            version: data.version,
          }),

          ...(data.createdAt !== undefined && {
            createdAt: data.createdAt,
          }),

          ...(data.updatedAt !== undefined && {
            updatedAt: data.updatedAt,
          }),
        },

        include: {
          author: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    try {
      return await this.database.template.delete({
        where: {
          id,
        },

        include: {
          author: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }
}