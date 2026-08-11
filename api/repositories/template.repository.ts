import { prisma } from "../lib/prisma";

export const templateRepository = {
  // =========================
  // Query
  // =========================

  async getAll() {
    return prisma.template.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        author: true,
      },
    });
  },

  async getById(id: string) {
    return prisma.template.findUnique({
      where: {
        id,
      },

      include: {
        author: true,
      },
    });
  },

  async getBySlug(slug: string) {
    return prisma.template.findUnique({
      where: {
        slug,
      },

      include: {
        author: true,
      },
    });
  },

  async getByAuthorId(authorId: string) {
    return prisma.template.findMany({
      where: {
        authorId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async getByCategory(category: string) {
    return prisma.template.findMany({
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
  },

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
    return prisma.template.create({
      data,
    });
  },

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
    }
  ) {
    return prisma.template.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id: string) {
    return prisma.template.delete({
      where: {
        id,
      },
    });
  },
};