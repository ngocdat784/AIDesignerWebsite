import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";

import { IncludedFileDto } from "./included-file.dto";
import { ChangelogDto } from "./changelog.dto";

export class UpdateTemplateDto {
  // =========================
  // Basic information
  // =========================

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  // =========================
  // Images
  // =========================

  @IsOptional()
  @IsString()
  coverImage?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  // =========================
  // Category / Tags
  // =========================

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedTemplateIds?: string[];

  // =========================
  // Technology
  // =========================

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  // =========================
  // Detail information
  // =========================

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IncludedFileDto)
  includedFiles?: IncludedFileDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  installationSteps?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChangelogDto)
  changelog?: ChangelogDto[];

  // =========================
  // Statistics
  // =========================

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsNumber()
  reviews?: number;

  @IsOptional()
  @IsNumber()
  downloads?: number;

  @IsOptional()
  @IsNumber()
  favorites?: number;

  @IsOptional()
  @IsNumber()
  views?: number;

  // =========================
  // Pricing
  // =========================

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  originalPrice?: number | null;

  @IsOptional()
  @IsNumber()
  discountPrice?: number | null;

  // =========================
  // Status
  // =========================

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  newest?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  isPremium?: boolean;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  stock?: number | null;

  @IsOptional()
  @IsString()
  license?: string | null;

  // =========================
  // Demo / Version
  // =========================

  @IsOptional()
  @IsString()
  demoUrl?: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: Date | string;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date | string;
}