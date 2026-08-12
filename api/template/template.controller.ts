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

import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";

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
    @Body() dto: CreateTemplateDto,
  ) {
    return this.templateService.create(dto);
  }

  // =========================
  // Update
  // =========================

  // PATCH /templates/:id
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateTemplateDto,
  ) {
    return this.templateService.update(id, dto);
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