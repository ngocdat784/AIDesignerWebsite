export interface UserRepositoryInterface {
  getAll(): Promise<any[]>;

  getById(
    id: string,
  ): Promise<any | null>;

  getByEmail(
    email: string,
  ): Promise<any | null>;

  create(
    data: {
      id: string;
      name: string;
      avatar?: string | null;
      email: string;
      passwordHash: string;
      role?: "USER" | "CREATOR" | "ADMIN";
    },
  ): Promise<any>;

  update(
    id: string,
    data: {
      name?: string;
      avatar?: string | null;
      email?: string;
      passwordHash?: string;
      role?: "USER" | "CREATOR" | "ADMIN";
    },
  ): Promise<any>;

  delete(
    id: string,
  ): Promise<any>;
}