import { User } from "../../generated/prisma/client";

export interface AuthRepositoryInterface {
  getById(id: string): Promise<User | null>;

  getByEmail(email: string): Promise<User | null>;

  create(data: {
    id: string;
    name: string;
    avatar?: string | null;
    email: string;
    passwordHash: string;
    role?: "USER" | "CREATOR" | "ADMIN";
  }): Promise<User>;
}