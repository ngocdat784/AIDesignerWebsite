import { Injectable, Inject } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { UserRepositoryInterface } from "../user/interfaces/user.repository.interface";
import { handlePrismaException } from "../common/exceptions/prisma.exception";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @Inject(DatabaseService)
    private readonly database: DatabaseService,
  ) {}

  // =========================
  // Query
  // =========================

  async getAll() {
    try {
      return await this.database.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

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
    avatar?: string;
    email: string;
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

  // =========================
  // Update
  // =========================

  async update(
    id: string,
    data: {
      name?: string;
      avatar?: string | null;
      email?: string;
      role?: "USER" | "CREATOR" | "ADMIN";
    },
  ) {
    try {
      return await this.database.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    try {
      return await this.database.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }
}