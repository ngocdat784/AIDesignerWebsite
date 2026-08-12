import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { TemplateService } from "./template.service";

@Controller("templates")
export class TemplateController {
  constructor(
    @Inject(TemplateService)
    private readonly templateService: TemplateService,
  ) {
    console.log("TemplateController injected successfully.");
  }

  // =========================
  // Query
  // =========================

  // GET /templates
  @Get()
  async getAll() {
    return this.templateService.getAll();
  }

  // GET /templates/slug/:slug
  @Get("slug/:slug")
  async getBySlug(
    @Param("slug") slug: string,
  ) {
    return this.templateService.getBySlug(slug);
  }

  // GET /templates/author/:authorId
  @Get("author/:authorId")
  async getByAuthorId(
    @Param("authorId") authorId: string,
  ) {
    return this.templateService.getByAuthorId(authorId);
  }

  // GET /templates/category/:category
  @Get("category/:category")
  async getByCategory(
    @Param("category") category: string,
  ) {
    return this.templateService.getByCategory(category);
  }

  // GET /templates/:id
  @Get(":id")
  async getById(
    @Param("id") id: string,
  ) {
    return this.templateService.getById(id);
  }

  // =========================
  // Create
  // =========================

  // POST /templates
  @Post()
  async create(
    @Body()
    data: {
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
    },
  ) {
    return this.templateService.create(data);
  }

  // =========================
  // Update
  // =========================

  // PATCH /templates/:id
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body()
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
    return this.templateService.update(id, data);
  }

  // =========================
  // Delete
  // =========================

  // DELETE /templates/:id
  @Delete(":id")
  async delete(
    @Param("id") id: string,
  ) {
    return this.templateService.delete(id);
  }
}