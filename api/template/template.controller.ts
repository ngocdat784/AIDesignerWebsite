import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { TemplateService } from "./template.service";

import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

import { CurrentUserPayload } from "../auth/interfaces/current-user.interface";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller("templates")
export class TemplateController {
  constructor(
    @Inject(TemplateService)
    private readonly templateService: TemplateService,
  ) {}

  // =========================
  // Query
  // =========================

  @Get()
  async getAll() {
    return this.templateService.getAll();
  }

  @Get("slug/:slug")
  async getBySlug(
    @Param("slug") slug: string,
  ) {
    return this.templateService.getBySlug(slug);
  }

  @Get("author/:authorId")
  async getByAuthorId(
    @Param("authorId") authorId: string,
  ) {
    return this.templateService.getByAuthorId(authorId);
  }

  @Get("category/:category")
  async getByCategory(
    @Param("category") category: string,
  ) {
    return this.templateService.getByCategory(category);
  }

  @Get(":id")
  async getById(
    @Param("id") id: string,
  ) {
    return this.templateService.getById(id);
  }

  // =========================
  // Create
  // =========================

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("CREATOR", "ADMIN")
  @Post()
  async create(
    @Body() dto: CreateTemplateDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.templateService.create(dto, user);
  }

  // =========================
  // Update
  // =========================

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("CREATOR", "ADMIN")
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateTemplateDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.templateService.update(
      id,
      dto,
      user,
    );
  }

  // =========================
  // Delete
  // =========================

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("CREATOR", "ADMIN")
  @Delete(":id")
  async delete(
    @Param("id") id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.templateService.delete(
      id,
      user,
    );
  }
}