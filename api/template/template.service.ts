import {
  ForbiddenException,
  Injectable,
  Inject,
  NotFoundException,
} from "@nestjs/common";

import { TemplateServiceInterface } from "./interfaces/template.service.interface";
import { TemplateRepositoryInterface } from "./interfaces/template.repository.interface";

import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";

import { CurrentUserPayload } from "../auth/interfaces/current-user.interface";

import { TEMPLATE_REPOSITORY } from "../common/constants/repository.tokens";

@Injectable()
export class TemplateService implements TemplateServiceInterface {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: TemplateRepositoryInterface,
  ) {}

  // =========================
  // Query
  // =========================

  async getAll() {
    return this.templateRepository.getAll();
  }

  async getById(id: string) {
    const template =
      await this.templateRepository.getById(id);

    if (!template) {
      throw new NotFoundException(
        `Template with id ${id} not found.`,
      );
    }

    return template;
  }

  async getBySlug(slug: string) {
    const template =
      await this.templateRepository.getBySlug(slug);

    if (!template) {
      throw new NotFoundException(
        `Template with slug ${slug} not found.`,
      );
    }

    return template;
  }

  async getByAuthorId(authorId: string) {
    return this.templateRepository.getByAuthorId(authorId);
  }

  async getByCategory(category: string) {
    return this.templateRepository.getByCategory(category);
  }

  // =========================
  // Create
  // =========================

  async create(
    dto: CreateTemplateDto,
    user: CurrentUserPayload,
  ) {
    /*
     * Chỉ CREATOR và ADMIN được đi tới đây
     * nhờ RoleGuard.
     *
     * Author của template phải là user hiện tại.
     */
    const data = {
      ...dto,
      authorId: user.id,
    };

    return this.templateRepository.create(data);
  }

  // =========================
  // Update
  // =========================

  async update(
    id: string,
    dto: UpdateTemplateDto,
    user: CurrentUserPayload,
  ) {
    const template = await this.getById(id);

    /*
     * ADMIN có toàn quyền.
     */
    if (user.role === "ADMIN") {
      return this.templateRepository.update(id, dto);
    }

    /*
     * CREATOR chỉ được sửa template
     * do chính mình tạo.
     */
    if (
      user.role === "CREATOR" &&
      template.authorId !== user.id
    ) {
      throw new ForbiddenException(
        "You can only update your own templates.",
      );
    }

    return this.templateRepository.update(id, dto);
  }

  // =========================
  // Delete
  // =========================

  async delete(
    id: string,
    user: CurrentUserPayload,
  ) {
    const template = await this.getById(id);

    /*
     * ADMIN có toàn quyền xóa.
     */
    if (user.role === "ADMIN") {
      return this.templateRepository.delete(id);
    }

    /*
     * CREATOR chỉ được xóa template
     * do chính mình tạo.
     */
    if (
      user.role === "CREATOR" &&
      template.authorId !== user.id
    ) {
      throw new ForbiddenException(
        "You can only delete your own templates.",
      );
    }

    return this.templateRepository.delete(id);
  }
}