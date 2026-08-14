import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
} from "@nestjs/common";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { CurrentUserPayload } from "./interfaces/current-user.interface";

import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RoleGuard } from "./guards/role.guard";

import { CurrentUser } from "./decorators/current-user.decorator";
import { Roles } from "./decorators/roles.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AuthServiceInterface")
    private readonly authService: AuthServiceInterface,
  ) {}

  // =========================
  // Register
  // =========================

  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // =========================
  // Login
  // =========================

  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // =========================
  // Current User
  // =========================

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return user;
  }

  // =========================
  // USER Test
  // =========================

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("USER", "CREATOR", "ADMIN")
  @Get("user-test")
  async userTest(
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return {
      message: "User access granted.",
      user,
    };
  }

  // =========================
  // CREATOR Test
  // =========================

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("CREATOR", "ADMIN")
  @Get("creator-test")
  async creatorTest(
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return {
      message: "Creator access granted.",
      user,
    };
  }

  // =========================
  // ADMIN Test
  // =========================

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("ADMIN")
  @Get("admin-test")
  async adminTest(
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return {
      message: "Admin access granted.",
      user,
    };
  }

  // =========================
  // CREATOR + ADMIN Test
  // =========================

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles("CREATOR", "ADMIN")
  @Get("creator-admin-test")
  async creatorAdminTest(
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return {
      message: "Creator/Admin access granted.",
      user,
    };
  }
}