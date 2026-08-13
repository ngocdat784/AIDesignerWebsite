import { Injectable, Inject } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { TemplateRepositoryInterface } from "../template/interfaces/template.repository.interface";

@Injectable()
export class TemplateRepository implements TemplateRepositoryInterface {
  constructor(
    @Inject(DatabaseService)
    private readonly database: DatabaseService,
  ) {}

  // =========================
  // Query
  // =========================

  async getAll() {
    return this.database.template.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });
  }

  async getById(id: string) {
    return this.database.template.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
  }

  async getBySlug(slug: string) {
    return this.database.template.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
      },
    });
  }

  async getByAuthorId(authorId: string) {
    return this.database.template.findMany({
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
  }

  async getByCategory(category: string) {
    return this.database.template.findMany({
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
    return this.database.template.create({
      data,
      include: {
        author: true,
      },
    });
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
    return this.database.template.update({
      where: {
        id,
      },
      data,
      include: {
        author: true,
      },
    });
  }

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    return this.database.template.delete({
      where: {
        id,
      },
    });
  }
}