import { Injectable, Inject } from "@nestjs/common";
import { TemplateServiceInterface } from "./interfaces/template.service.interface";
import { TEMPLATE_REPOSITORY } from "../common/constants/repository.tokens";
import { TemplateRepositoryInterface } from "./interfaces/template.repository.interface";

@Injectable()
export class TemplateService implements TemplateServiceInterface {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: TemplateRepositoryInterface,
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