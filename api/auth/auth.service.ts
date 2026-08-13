import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { AuthServiceResponse } from "./interfaces/auth.service-response.interface";
import { AuthRepositoryInterface } from "./interfaces/auth.repository.interface";

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject("AuthRepositoryInterface")
    private readonly authRepository: AuthRepositoryInterface,
  ) {}

  // =========================
  // Register
  // =========================

  async register(
    dto: RegisterDto,
  ): Promise<AuthServiceResponse> {
    const existingUser =
      await this.authRepository.getByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException("Email already exists.");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.authRepository.create({
      id: crypto.randomUUID(),
      name: dto.name,
      email: dto.email,
      passwordHash,
      role: "USER",
    });

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // =========================
  // Login
  // =========================

  async login(
    dto: LoginDto,
  ): Promise<AuthServiceResponse> {
    const user =
      await this.authRepository.getByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException(
        "Invalid email or password.",
      );
    }

    const passwordMatched = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException(
        "Invalid email or password.",
      );
    }

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}