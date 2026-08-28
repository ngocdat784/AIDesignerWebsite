import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateOrderItemDto {
  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsString()
  styleId?: string;
}