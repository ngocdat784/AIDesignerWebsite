import { Injectable, Inject } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { UserRepositoryInterface } from "../user/interfaces/user.repository.interface";

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
    return this.database.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getById(id: string) {
    return this.database.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return this.database.user.findUnique({
      where: {
        email,
      },
    });
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
    return this.database.user.create({
      data,
    });
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
    return this.database.user.update({
      where: {
        id,
      },
      data,
    });
  }

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    return this.database.user.delete({
      where: {
        id,
      },
    });
  }
}