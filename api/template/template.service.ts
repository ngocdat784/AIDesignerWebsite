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

import { ITemplateStyleRepository } from "../template-style/interfaces/template-style.repository.interface";

@Injectable()
export class TemplateService
  implements TemplateServiceInterface
{
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: TemplateRepositoryInterface,

    @Inject("TEMPLATE_STYLE_REPOSITORY")
    private readonly templateStyleRepository: ITemplateStyleRepository,
  ) {}

  // =========================================================
  // Query
  // =========================================================

  async getAll() {
    return this.templateRepository.getAll();
  }

  // =========================================================
  // GET /templates/:id
  // =========================================================

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

  // =========================================================
  // GET /templates/slug/:slug
  // =========================================================

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

  // =========================================================
  // GET /templates/author/:authorId
  // =========================================================

  async getByAuthorId(
    authorId: string,
  ) {
    return this.templateRepository.getByAuthorId(
      authorId,
    );
  }

  // =========================================================
  // GET /templates/category/:category
  // =========================================================

  async getByCategory(
    category: string,
  ) {
    return this.templateRepository.getByCategory(
      category,
    );
  }

  // =========================================================
  // Validate Template Style
  // =========================================================

  private async validateStyle(
    styleId?: string | null,
  ) {
    /*
     * Không truyền styleId:
     * Không cần kiểm tra.
     */

    if (styleId === undefined) {
      return;
    }

    /*
     * styleId = null:
     * Cho phép template không sử dụng style.
     */

    if (styleId === null) {
      return;
    }

    /*
     * styleId có giá trị:
     * Kiểm tra TemplateStyle tồn tại.
     */

    const style =
      await this.templateStyleRepository.findById(
        styleId,
      );

    if (!style) {
      throw new NotFoundException(
        `Template style with id ${styleId} not found.`,
      );
    }

    /*
     * Không cho gán style đã bị inactive.
     */

    if (!style.isActive) {
      throw new ForbiddenException(
        `Template style with id ${styleId} is inactive.`,
      );
    }
  }

  // =========================================================
  // Create
  // =========================================================

  async create(
    dto: CreateTemplateDto,
    user: CurrentUserPayload,
  ) {
    /*
     * RoleGuard đã đảm bảo user là:
     *
     * CREATOR hoặc ADMIN
     *
     * Không lấy authorId từ request body.
     * Template luôn được gắn với user hiện tại.
     */

    /*
     * Kiểm tra style trước khi tạo template.
     */

    await this.validateStyle(dto.styleId);

    const data = {
      ...dto,

      authorId: user.id,
    };

    return this.templateRepository.create(
      data,
    );
  }

  // =========================================================
  // Update
  // =========================================================

  async update(
    id: string,
    dto: UpdateTemplateDto,
    user: CurrentUserPayload,
  ) {
    /*
     * Kiểm tra template tồn tại trước.
     */

    const template =
      await this.templateRepository.getById(
        id,
      );

    if (!template) {
      throw new NotFoundException(
        `Template with id ${id} not found.`,
      );
    }

    /*
     * Nếu request muốn thay đổi style,
     * kiểm tra style mới trước.
     *
     * Nếu styleId không xuất hiện trong request,
     * giữ nguyên style hiện tại.
     */

    if (dto.styleId !== undefined) {
      await this.validateStyle(dto.styleId);
    }

    /*
     * ADMIN:
     *
     * Có quyền sửa mọi template.
     */

    if (user.role === "ADMIN") {
      return this.templateRepository.update(
        id,
        dto,
      );
    }

    /*
     * CREATOR:
     *
     * Chỉ được sửa template của chính mình.
     */

    if (
      user.role === "CREATOR" &&
      template.authorId !== user.id
    ) {
      throw new ForbiddenException(
        "You can only update your own templates.",
      );
    }

    return this.templateRepository.update(
      id,
      dto,
    );
  }

  // =========================================================
  // Delete
  // =========================================================

  async delete(
    id: string,
    user: CurrentUserPayload,
  ) {
    /*
     * Kiểm tra template tồn tại.
     */

    const template =
      await this.templateRepository.getById(
        id,
      );

    if (!template) {
      throw new NotFoundException(
        `Template with id ${id} not found.`,
      );
    }

    /*
     * ADMIN:
     *
     * Có quyền xóa mọi template.
     */

    if (user.role === "ADMIN") {
      return this.templateRepository.delete(
        id,
      );
    }

    /*
     * CREATOR:
     *
     * Chỉ được xóa template của chính mình.
     */

    if (
      user.role === "CREATOR" &&
      template.authorId !== user.id
    ) {
      throw new ForbiddenException(
        "You can only delete your own templates.",
      );
    }

    return this.templateRepository.delete(
      id,
    );
  }
}