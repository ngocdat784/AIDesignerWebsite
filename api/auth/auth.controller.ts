import {
  Body,
  Controller,
  Inject,
  Post,
} from "@nestjs/common";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AuthServiceInterface")
    private readonly authService: AuthServiceInterface,
  ) {}

  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}