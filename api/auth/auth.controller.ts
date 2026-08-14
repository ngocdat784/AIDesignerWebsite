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
import { CurrentUser } from "./decorators/current-user.decorator";

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
}