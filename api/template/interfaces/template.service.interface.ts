import type { Template } from "../../generated/prisma/client";

import { CreateTemplateDto } from "../dto/create-template.dto";
import { UpdateTemplateDto } from "../dto/update-template.dto";

import { CurrentUserPayload } from "../../auth/interfaces/current-user.interface";

export interface TemplateServiceInterface {
  // =========================
  // Query
  // =========================

  getAll(): Promise<Template[]>;

  getById(
    id: string,
  ): Promise<Template | null>;

  getBySlug(
    slug: string,
  ): Promise<Template | null>;

  getByAuthorId(
    authorId: string,
  ): Promise<Template[]>;

  getByCategory(
    category: string,
  ): Promise<Template[]>;

  // =========================
  // Create
  // =========================

  create(
    dto: CreateTemplateDto,
    user: CurrentUserPayload,
  ): Promise<Template>;

  // =========================
  // Update
  // =========================

  update(
    id: string,
    dto: UpdateTemplateDto,
    user: CurrentUserPayload,
  ): Promise<Template>;

  // =========================
  // Delete
  // =========================

  delete(
    id: string,
    user: CurrentUserPayload,
  ): Promise<Template>;
}