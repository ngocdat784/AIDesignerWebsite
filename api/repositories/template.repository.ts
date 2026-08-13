import { Injectable, Inject } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { TemplateRepositoryInterface } from "../template/interfaces/template.repository.interface";
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

  async create(data: {
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
  }) {
    try {
      return await this.database.template.create({
        data,
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
    data: {
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
    },
  ) {
    try {
      return await this.database.template.update({
        where: {
          id,
        },
        data,
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
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }
}