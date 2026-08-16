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
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
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
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
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
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
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
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
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
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
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
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      handlePrismaException(error);
    }
  }
}