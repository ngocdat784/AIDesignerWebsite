import { Prisma } from "../../generated/prisma/client";

export type CreateTemplateStyleData = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;

  colors?: Prisma.InputJsonValue | null;
  gradients?: Prisma.InputJsonValue | null;
  typography?: Prisma.InputJsonValue | null;
  layout?: Prisma.InputJsonValue | null;

  previewImage?: string | null;
  isActive?: boolean;
};

export type UpdateTemplateStyleData = {
  slug?: string;
  name?: string;
  description?: string | null;

  colors?: Prisma.InputJsonValue | null;
  gradients?: Prisma.InputJsonValue | null;
  typography?: Prisma.InputJsonValue | null;
  layout?: Prisma.InputJsonValue | null;

  previewImage?: string | null;
  isActive?: boolean;
};

export interface ITemplateStyleRepository {
  findAll(): Promise<any[]>;

  findActive(): Promise<any[]>;

  findById(id: string): Promise<any | null>;

  findBySlug(slug: string): Promise<any | null>;

  create(
    data: CreateTemplateStyleData,
  ): Promise<any>;

  update(
    id: string,
    data: UpdateTemplateStyleData,
  ): Promise<any>;

  delete(id: string): Promise<any>;

  existsById(id: string): Promise<boolean>;

  existsBySlug(slug: string): Promise<boolean>;
}