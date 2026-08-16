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
import { Roles } from "../auth/decorators/roles.decorator";

import { CurrentUserPayload } from "../auth/interfaces/current-user.interface";

@Controller("templates")
export class TemplateController {
  constructor(
    @Inject(TemplateService)
    private readonly templateService: TemplateService,
  ) {}

  // =========================================================
  // Public Query
  // =========================================================

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
    return this.templateService.getByAuthorId(
      authorId,
    );
  }

  // GET /templates/category/:category
  @Get("category/:category")
  async getByCategory(
    @Param("category") category: string,
  ) {
    return this.templateService.getByCategory(
      category,
    );
  }

  // GET /templates/:id
  @Get(":id")
  async getById(
    @Param("id") id: string,
  ) {
    return this.templateService.getById(id);
  }

  // =========================================================
  // Create
  // =========================================================

  // POST /templates
  //
  // CREATOR / ADMIN only
  //
  // authorId được xác định từ JWT,
  // không tin authorId do client gửi lên.
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("CREATOR", "ADMIN")
  @Post()
  async create(
    @Body() dto: CreateTemplateDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.templateService.create(
      dto,
      user,
    );
  }

  // =========================================================
  // Update
  // =========================================================

  // PATCH /templates/:id
  //
  // CREATOR:
  //   chỉ sửa template của mình
  //
  // ADMIN:
  //   sửa mọi template
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

  // =========================================================
  // Delete
  // =========================================================

  // DELETE /templates/:id
  //
  // CREATOR:
  //   chỉ xóa template của mình
  //
  // ADMIN:
  //   xóa mọi template
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