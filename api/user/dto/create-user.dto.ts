import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export enum UserRole {
  USER = "USER",
  CREATOR = "CREATOR",
  ADMIN = "ADMIN",
}

export class CreateUserDto {
  id!: string;

  name!: string;

  avatar?: string;

  email!: string;

  role?: "USER" | "CREATOR" | "ADMIN";
}