import { prisma } from "../lib/prisma";

export const userRepository = {
  // =========================
  // Query
  // =========================

  async getAll() {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async getById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  async getByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

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
    return prisma.user.create({
      data,
    });
  },

  async update(
    id: string,
    data: {
      name?: string;
      avatar?: string | null;
      email?: string;
      role?: "USER" | "CREATOR" | "ADMIN";
    }
  ) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id: string) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  },
};