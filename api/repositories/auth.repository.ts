import { Injectable, Inject } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { AuthRepositoryInterface } from "../auth/interfaces/auth.repository.interface";
import { handlePrismaException } from "../common/exceptions/prisma.exception";

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
  constructor(
    @Inject(DatabaseService)
    private readonly database: DatabaseService,
  ) {}

  // =========================
  // Query
  // =========================

  async getById(id: string) {
    try {
      return await this.database.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  async getByEmail(email: string) {
    try {
      return await this.database.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  // =========================
  // Create
  // =========================

  async create(data: {
    id: string;
    name: string;
    avatar?: string | null;
    email: string;
    passwordHash: string;
    role?: "USER" | "CREATOR" | "ADMIN";
  }) {
    try {
      return await this.database.user.create({
        data,
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }
}