import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateTemplateStyleDto {
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

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

  @IsOptional()
  @IsString()
  previewImage?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}