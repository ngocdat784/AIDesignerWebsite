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

import { CreateTemplateStyleDto } from "./dto/create-template-style.dto";
import { UpdateTemplateStyleDto } from "./dto/update-template-style.dto";
import { TemplateStyleService } from "./template-style.service";

@Controller("template-styles")
export class TemplateStyleController {
  constructor(
    @Inject(TemplateStyleService)
    private readonly templateStyleService: TemplateStyleService,
  ) {}

  // =========================
  // Create
  // POST /template-styles
  // =========================

  @Post()
  async create(
    @Body() createTemplateStyleDto: CreateTemplateStyleDto,
  ) {
    return this.templateStyleService.create(
      createTemplateStyleDto,
    );
  }

  // =========================
  // Find all
  // GET /template-styles
  // =========================

  @Get()
  async findAll() {
    return this.templateStyleService.findAll();
  }

  // =========================
  // Find active styles
  // GET /template-styles/active
  // =========================

  @Get("active")
  async findActive() {
    return this.templateStyleService.findActive();
  }

  // =========================
  // Find by slug
  // GET /template-styles/slug/:slug
  // =========================

  @Get("slug/:slug")
  async findBySlug(
    @Param("slug") slug: string,
  ) {
    return this.templateStyleService.findBySlug(slug);
  }

  // =========================
  // Find one
  // GET /template-styles/:id
  // =========================

  @Get(":id")
  async findOne(
    @Param("id") id: string,
  ) {
    return this.templateStyleService.findOne(id);
  }

  // =========================
  // Update
  // PATCH /template-styles/:id
  // =========================

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTemplateStyleDto: UpdateTemplateStyleDto,
  ) {
    return this.templateStyleService.update(
      id,
      updateTemplateStyleDto,
    );
  }

  // =========================
  // Delete
  // DELETE /template-styles/:id
  // =========================

  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ) {
    return this.templateStyleService.remove(id);
  }
}