import {
  ConflictException,
  Injectable,
  NotFoundException,
  Inject,
} from "@nestjs/common";

import { randomUUID } from "crypto";

import { CreateTemplateStyleDto } from "./dto/create-template-style.dto";
import { UpdateTemplateStyleDto } from "./dto/update-template-style.dto";

import { ITemplateStyleService } from "./interfaces/template-style.service.interface";
import { ITemplateStyleRepository } from "./interfaces/template-style.repository.interface";

import { TEMPLATE_STYLE_REPOSITORY } from "../common/constants/repository.tokens";

@Injectable()
export class TemplateStyleService
  implements ITemplateStyleService
{
  constructor(
    @Inject(TEMPLATE_STYLE_REPOSITORY)
    private readonly templateStyleRepository: ITemplateStyleRepository,
  ) {}

  // =========================
  // Create
  // =========================

  async create(
    createTemplateStyleDto: CreateTemplateStyleDto,
  ): Promise<any> {
    // =========================
    // Check duplicate slug
    // =========================

    const existingStyle =
      await this.templateStyleRepository.findBySlug(
        createTemplateStyleDto.slug,
      );

    if (existingStyle) {
      throw new ConflictException(
        "Template style with this slug already exists",
      );
    }

    // =========================
    // Create
    // =========================

    return this.templateStyleRepository.create({
      id: randomUUID(),

      slug:
        createTemplateStyleDto.slug,

      name:
        createTemplateStyleDto.name,

      description:
        createTemplateStyleDto.description ?? null,

      colors:
        createTemplateStyleDto.colors ?? null,

      gradients:
        createTemplateStyleDto.gradients ?? null,

      typography:
        createTemplateStyleDto.typography ?? null,

      layout:
        createTemplateStyleDto.layout ?? null,

      previewImage:
        createTemplateStyleDto.previewImage ?? null,

      isActive:
        createTemplateStyleDto.isActive ?? true,
    });
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

  async findOne(
    id: string,
  ): Promise<any> {
    const style =
      await this.templateStyleRepository.findById(
        id,
      );

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

  async findBySlug(
    slug: string,
  ): Promise<any> {
    const style =
      await this.templateStyleRepository.findBySlug(
        slug,
      );

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
    // =========================
    // Check existing style
    // =========================

    const existingStyle =
      await this.templateStyleRepository.findById(
        id,
      );

    if (!existingStyle) {
      throw new NotFoundException(
        `Template style with ID "${id}" not found`,
      );
    }

    // =========================
    // Check duplicate slug
    // =========================

    if (
      updateTemplateStyleDto.slug &&
      updateTemplateStyleDto.slug !==
        existingStyle.slug
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

    // =========================
    // Update
    // =========================

    return this.templateStyleRepository.update(
      id,
      updateTemplateStyleDto,
    );
  }

  // =========================
  // Remove
  // =========================

  async remove(
    id: string,
  ): Promise<any> {
    // =========================
    // Check existing style
    // =========================

    const existingStyle =
      await this.templateStyleRepository.findById(
        id,
      );

    if (!existingStyle) {
      throw new NotFoundException(
        `Template style with ID "${id}" not found`,
      );
    }

    // =========================
    // Delete
    // =========================

    return this.templateStyleRepository.delete(
      id,
    );
  }
}