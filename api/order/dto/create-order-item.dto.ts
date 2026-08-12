import { IsInt, IsNumber, IsString, Min } from "class-validator";

export class CreateOrderItemDto {
  @IsString()
  id!: string;

  @IsString()
  productId!: string;

  @IsString()
  productName!: string;

  @IsNumber()
  unitPrice!: number;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsNumber()
  subtotal!: number;
}