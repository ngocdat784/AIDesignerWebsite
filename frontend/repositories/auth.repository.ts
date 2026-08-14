import { apiClient } from "@/lib/api-client";

// =========================
// Types
// =========================

export type UserRole =
  | "USER"
  | "CREATOR"
  | "ADMIN";

export interface AuthUser {
  id: string;
  name?: string;
  avatar?: string | null;
  email: string;
  role: UserRole;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

// =========================
// Auth Repository
// =========================

export const authRepository = {
  // =========================
  // Register
  // POST /auth/register
  // =========================

  async register(
    data: RegisterData,
  ): Promise<AuthUser> {
    return apiClient<AuthUser>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  },

  // =========================
  // Login
  // POST /auth/login
  // =========================

  async login(
    data: LoginData,
  ): Promise<AuthResponse> {
    const result =
      await apiClient<AuthResponse>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );

    return result;
  },

  // =========================
  // Current User
  // GET /auth/me
  // =========================

  async getCurrentUser(): Promise<AuthUser> {
    return apiClient<AuthUser>(
      "/auth/me",
      {
        method: "GET",
      },
    );
  },
};