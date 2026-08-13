import {
  ConflictException,
  Inject,
  Injectable,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { AuthRepositoryInterface } from "./interfaces/auth.repository.interface";

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject("AuthRepositoryInterface")
    private readonly authRepository: AuthRepositoryInterface,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.authRepository.getByEmail(dto.email);

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

  async login(dto: LoginDto) {
    throw new Error("Login is not implemented yet.");
  }
}