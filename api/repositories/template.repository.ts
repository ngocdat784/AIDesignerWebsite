import { Injectable, Inject } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class TemplateRepository {
  constructor(
    @Inject(DatabaseService)
    private database: DatabaseService,
  ) {
    console.log("TemplateRepository constructor");

    if (!this.database) {
      console.log(
        "DatabaseService not injected — creating fallback instance.",
      );

      // Fallback cho test script khi DI metadata không có
      this.database = new DatabaseService();
    }

    console.log("database =", this.database);
    console.log("database.template =", this.database?.template);
  }

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
  // Commands
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