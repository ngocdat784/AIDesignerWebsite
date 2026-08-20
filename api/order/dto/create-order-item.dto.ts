import {
  IsInt,
  IsNumber,
  IsString,
  Min,
} from "class-validator";

export class CreateOrderItemDto {
  @IsString()
  productId!: string;

  @IsString()
  productName!: string;

  @IsNumber()
  unitPrice!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}