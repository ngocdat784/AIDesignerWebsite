import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Inject,
  ValidationPipe,
} from "@nestjs/common";

import { UserService } from "./user.service";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

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
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: CreateUserDto,
  ) {
    console.log(
      "CreateUserDto received:",
      dto,
      dto?.constructor?.name,
    );
    return this.userService.create(dto);
  }

  // =========================
  // UPDATE
  // =========================

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
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