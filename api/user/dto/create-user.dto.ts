import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export enum UserRole {
  USER = "USER",
  CREATOR = "CREATOR",
  ADMIN = "ADMIN",
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  passwordHash!: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}