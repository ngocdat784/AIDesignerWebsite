import {
  Injectable,
  Inject,
  NotFoundException,
} from "@nestjs/common";

import { TemplateServiceInterface } from "./interfaces/template.service.interface";
import { TemplateRepositoryInterface } from "./interfaces/template.repository.interface";

import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";

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

  async create(dto: CreateTemplateDto) {
    /*
     * Không xử lý P2002 ở Service.
     *
     * Nếu id hoặc slug bị trùng:
     *
     * Prisma P2002
     *      ↓
     * TemplateRepository
     *      ↓
     * handlePrismaException()
     *      ↓
     * ConflictException
     */
    return this.templateRepository.create(dto);
  }

  // =========================
  // Update
  // =========================

  async update(
    id: string,
    dto: UpdateTemplateDto,
  ) {
    /*
     * Kiểm tra template tồn tại trước.
     */
    await this.getById(id);

    /*
     * Các lỗi Prisma tiếp tục được xử lý
     * tập trung tại Repository.
     */
    return this.templateRepository.update(id, dto);
  }

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    /*
     * Kiểm tra template tồn tại trước khi xóa.
     */
    await this.getById(id);

    return this.templateRepository.delete(id);
  }
}