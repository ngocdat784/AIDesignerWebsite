import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class UserRepository {
  constructor(
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
  // Commands
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

  async delete(id: string) {
    return this.database.user.delete({
      where: {
        id,
      },
    });
  }
}