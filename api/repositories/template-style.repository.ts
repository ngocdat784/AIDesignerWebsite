import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";

import {
  ITemplateStyleRepository,
  CreateTemplateStyleData,
  UpdateTemplateStyleData,
} from "../template-style/interfaces/template-style.repository.interface";

import { TemplateStyle } from "../generated/prisma/client";

@Injectable()
export class TemplateStyleRepository
  implements ITemplateStyleRepository
{
  constructor(
    private readonly database: DatabaseService,
  ) {}

  // =========================
  // Create
  // =========================

  async create(
    data: CreateTemplateStyleData,
  ): Promise<TemplateStyle> {
    return this.database.templateStyle.create({
      data: {
        id: data.id,
        slug: data.slug,
        name: data.name,
        description: data.description,
        colors: data.colors ?? undefined,
        gradients: data.gradients ?? undefined,
        typography: data.typography ?? undefined,
        layout: data.layout ?? undefined,
        previewImage: data.previewImage,
        isActive: data.isActive ?? true,
      },
    });
  }

  // =========================
  // Find all
  // =========================

  async findAll(): Promise<TemplateStyle[]> {
    return this.database.templateStyle.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // =========================
  // Find active
  // =========================

  async findActive(): Promise<TemplateStyle[]> {
    return this.database.templateStyle.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // =========================
  // Find by ID
  // =========================

  async findById(
    id: string,
  ): Promise<TemplateStyle | null> {
    return this.database.templateStyle.findUnique({
      where: {
        id,
      },
    });
  }

  // =========================
  // Find by slug
  // =========================

  async findBySlug(
    slug: string,
  ): Promise<TemplateStyle | null> {
    return this.database.templateStyle.findUnique({
      where: {
        slug,
      },
    });
  }

  // =========================
  // Update
  // =========================

  async update(
    id: string,
    data: UpdateTemplateStyleData,
  ): Promise<TemplateStyle> {
    return this.database.templateStyle.update({
      where: {
        id,
      },
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description,
        colors: data.colors ?? undefined,
        gradients: data.gradients ?? undefined,
        typography: data.typography ?? undefined,
        layout: data.layout ?? undefined,
        previewImage: data.previewImage,
        isActive: data.isActive,
      },
    });
  }

  // =========================
  // Delete
  // =========================

  async delete(
    id: string,
  ): Promise<TemplateStyle> {
    return this.database.templateStyle.delete({
      where: {
        id,
      },
    });
  }

  // =========================
  // Exists by ID
  // =========================

  async existsById(
    id: string,
  ): Promise<boolean> {
    const style =
      await this.database.templateStyle.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });

    return !!style;
  }

  // =========================
  // Exists by slug
  // =========================

  async existsBySlug(
    slug: string,
  ): Promise<boolean> {
    const style =
      await this.database.templateStyle.findUnique({
        where: {
          slug,
        },
        select: {
          id: true,
        },
      });

    return !!style;
  }
}