import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateTemplateStyleDto {
  // =========================
  // Basic information
  // =========================

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  // =========================
  // Style
  // =========================

  @IsOptional()
  @IsObject()
  colors?: Record<string, string>;

  @IsOptional()
  @IsObject()
  gradients?: Record<string, string>;

  @IsOptional()
  @IsObject()
  typography?: Record<string, string>;

  @IsOptional()
  @IsObject()
  layout?: Record<string, string>;

  // =========================
  // Preview
  // =========================

  @IsOptional()
  @IsString()
  previewImage?: string;

  // =========================
  // Status
  // =========================

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}