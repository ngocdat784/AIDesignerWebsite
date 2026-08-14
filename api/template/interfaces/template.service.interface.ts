import { CreateTemplateDto } from "../dto/create-template.dto";
import { UpdateTemplateDto } from "../dto/update-template.dto";
import { CurrentUserPayload } from "../../auth/interfaces/current-user.interface";

export interface TemplateServiceInterface {
  // =========================
  // Query
  // =========================

  getAll(): Promise<any>;

  getById(id: string): Promise<any>;

  getBySlug(slug: string): Promise<any>;

  getByAuthorId(authorId: string): Promise<any>;

  getByCategory(category: string): Promise<any>;

  // =========================
  // Create
  // =========================

  create(
    dto: CreateTemplateDto,
    user: CurrentUserPayload,
  ): Promise<any>;

  // =========================
  // Update
  // =========================

  update(
    id: string,
    dto: UpdateTemplateDto,
    user: CurrentUserPayload,
  ): Promise<any>;

  // =========================
  // Delete
  // =========================

  delete(
    id: string,
    user: CurrentUserPayload,
  ): Promise<any>;
}