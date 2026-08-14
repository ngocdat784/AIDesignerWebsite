import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Inject,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";

import { UserService } from "./user.service";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RoleGuard } from "../auth/guards/role.guard";

import { Roles } from "../auth/decorators/roles.decorator";

@Controller("users")
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles("ADMIN")
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  // =========================
  // GET ALL USERS
  // ADMIN ONLY
  // =========================

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  // =========================
  // GET USER BY EMAIL
  // ADMIN ONLY
  // =========================

  @Get("email/:email")
  async getByEmail(
    @Param("email") email: string,
  ) {
    return this.userService.getByEmail(email);
  }

  // =========================
  // GET USER BY ID
  // ADMIN ONLY
  // =========================

  @Get(":id")
  async getById(
    @Param("id") id: string,
  ) {
    return this.userService.getById(id);
  }

  // =========================
  // CREATE USER
  // ADMIN ONLY
  // =========================

  @Post()
  async create(
    @Body(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    )
    dto: CreateUserDto,
  ) {
    return this.userService.create(dto);
  }

  // =========================
  // UPDATE USER
  // ADMIN ONLY
  // =========================

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }

  // =========================
  // DELETE USER
  // ADMIN ONLY
  // =========================

  @Delete(":id")
  async delete(
    @Param("id") id: string,
  ) {
    return this.userService.delete(id);
  }
}