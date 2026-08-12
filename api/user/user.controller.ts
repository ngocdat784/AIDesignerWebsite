import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Inject,
} from "@nestjs/common";

import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  // =========================
  // GET ALL
  // =========================

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  // =========================
  // GET BY EMAIL
  // =========================

  @Get("email/:email")
  async getByEmail(
    @Param("email") email: string,
  ) {
    return this.userService.getByEmail(email);
  }

  // =========================
  // GET BY ID
  // =========================

  @Get(":id")
  async getById(
    @Param("id") id: string,
  ) {
    return this.userService.getById(id);
  }

  // =========================
  // CREATE
  // =========================

  @Post()
  async create(
    @Body()
    data: {
      id: string;
      name: string;
      avatar?: string;
      email: string;
      role?: "USER" | "CREATOR" | "ADMIN";
    },
  ) {
    return this.userService.create(data);
  }

  // =========================
  // UPDATE
  // =========================

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body()
    data: {
      name?: string;
      avatar?: string | null;
      email?: string;
      role?: "USER" | "CREATOR" | "ADMIN";
    },
  ) {
    return this.userService.update(id, data);
  }

  // =========================
  // DELETE
  // =========================

  @Delete(":id")
  async delete(
    @Param("id") id: string,
  ) {
    return this.userService.delete(id);
  }
}