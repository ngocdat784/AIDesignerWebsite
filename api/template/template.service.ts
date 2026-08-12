import { Injectable, Inject } from "@nestjs/common";
import { TemplateRepository } from "../repositories/template.repository";

@Injectable()
export class TemplateService {
  constructor(
    @Inject(TemplateRepository)
    private readonly templateRepository: TemplateRepository,
  ) {
    console.log("TemplateService injected successfully.");
  }

  // =========================
  // Query
  // =========================

  async getAll() {
    return this.templateRepository.getAll();
  }

  async getById(id: string) {
    return this.templateRepository.getById(id);
  }

  async getBySlug(slug: string) {
    return this.templateRepository.getBySlug(slug);
  }

  async getByAuthorId(authorId: string) {
    return this.templateRepository.getByAuthorId(authorId);
  }

  async getByCategory(category: string) {
    return this.templateRepository.getByCategory(category);
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
    return this.templateRepository.create(data);
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
    return this.templateRepository.update(id, data);
  }

  async delete(id: string) {
    return this.templateRepository.delete(id);
  }
}