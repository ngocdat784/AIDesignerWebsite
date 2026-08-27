import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { TemplateStyleRepository } from "../repositories/template-style.repository";

import { CreateTemplateStyleDto } from "./dto/create-template-style.dto";
import { UpdateTemplateStyleDto } from "./dto/update-template-style.dto";

import { ITemplateStyleService } from "./interfaces/template-style.service.interface";

@Injectable()
export class TemplateStyleService implements ITemplateStyleService {
  constructor(
    private readonly templateStyleRepository: TemplateStyleRepository,
  ) {}

  // =========================
  // Create
  // =========================

  async create(
    createTemplateStyleDto: CreateTemplateStyleDto,
  ): Promise<any> {
    const existingStyle =
      await this.templateStyleRepository.findBySlug(
        createTemplateStyleDto.slug,
      );

    if (existingStyle) {
      throw new ConflictException(
        "Template style with this slug already exists",
      );
    }

    return this.templateStyleRepository.create(
      createTemplateStyleDto,
    );
  }

  // =========================
  // Find all
  // =========================

  async findAll(): Promise<any[]> {
    return this.templateStyleRepository.findAll();
  }

  // =========================
  // Find active
  // =========================

  async findActive(): Promise<any[]> {
    return this.templateStyleRepository.findActive();
  }

  // =========================
  // Find one
  // =========================

  async findOne(id: string): Promise<any> {
    const style =
      await this.templateStyleRepository.findById(id);

    if (!style) {
      throw new NotFoundException(
        `Template style with ID "${id}" not found`,
      );
    }

    return style;
  }

  // =========================
  // Find by slug
  // =========================

  async findBySlug(slug: string): Promise<any> {
    const style =
      await this.templateStyleRepository.findBySlug(slug);

    if (!style) {
      throw new NotFoundException(
        `Template style with slug "${slug}" not found`,
      );
    }

    return style;
  }

  // =========================
  // Update
  // =========================

  async update(
    id: string,
    updateTemplateStyleDto: UpdateTemplateStyleDto,
  ): Promise<any> {
    const existingStyle =
      await this.templateStyleRepository.findById(id);

    if (!existingStyle) {
      throw new NotFoundException(
        `Template style with ID "${id}" not found`,
      );
    }

    if (
      updateTemplateStyleDto.slug &&
      updateTemplateStyleDto.slug !== existingStyle.slug
    ) {
      const slugExists =
        await this.templateStyleRepository.findBySlug(
          updateTemplateStyleDto.slug,
        );

      if (slugExists) {
        throw new ConflictException(
          "Template style with this slug already exists",
        );
      }
    }

    return this.templateStyleRepository.update(
      id,
      updateTemplateStyleDto,
    );
  }

  // =========================
  // Remove
  // =========================

  async remove(id: string): Promise<any> {
    const existingStyle =
      await this.templateStyleRepository.findById(id);

    if (!existingStyle) {
      throw new NotFoundException(
        `Template style with ID "${id}" not found`,
      );
    }

    return this.templateStyleRepository.delete(id);
  }
}