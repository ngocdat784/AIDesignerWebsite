export interface UserServiceInterface {
  getAll(): Promise<any[]>;

  getById(
    id: string,
  ): Promise<any>;

  getByEmail(
    email: string,
  ): Promise<any>;

  create(
    data: {
      id: string;
      name: string;
      avatar?: string;
      email: string;
      role?: "USER" | "CREATOR" | "ADMIN";
    },
  ): Promise<any>;

  update(
    id: string,
    data: {
      name?: string;
      avatar?: string | null;
      email?: string;
      role?: "USER" | "CREATOR" | "ADMIN";
    },
  ): Promise<any>;

  delete(
    id: string,
  ): Promise<any>;
}