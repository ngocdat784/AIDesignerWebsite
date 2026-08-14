import {
  authRepository,
  AuthUser,
  LoginData,
  RegisterData,
} from "@/repositories/auth.repository";

const ACCESS_TOKEN_KEY = "accessToken";

export const authService = {
  // =========================
  // Register
  // =========================

  async register(
    data: RegisterData,
  ): Promise<AuthUser> {
    return authRepository.register(data);
  },

  // =========================
  // Login
  // =========================

  async login(data: LoginData): Promise<AuthUser> {
    const result =
      await authRepository.login(data);

    /*
     * Chỉ thao tác localStorage ở phía browser.
     */
    if (typeof window !== "undefined") {
      localStorage.setItem(
        ACCESS_TOKEN_KEY,
        result.accessToken,
      );
    }

    /*
     * Login thành công thì trả user về
     * cho AuthContext / Store cập nhật state.
     */
    return result.user;
  },

  // =========================
  // Current User
  // GET /auth/me
  // =========================

  async getCurrentUser(): Promise<AuthUser> {
    return authRepository.getCurrentUser();
  },

  // =========================
  // Restore Session
  // =========================

  async restoreSession(): Promise<AuthUser | null> {
    if (typeof window === "undefined") {
      return null;
    }

    const token =
      localStorage.getItem(
        ACCESS_TOKEN_KEY,
      );

    /*
     * Không có token => chưa đăng nhập.
     */
    if (!token) {
      return null;
    }

    try {
      /*
       * apiClient tự lấy accessToken từ localStorage
       * và gửi:
       *
       * Authorization: Bearer <token>
       */
      return await this.getCurrentUser();
    } catch (error) {
      /*
       * Token hết hạn / không hợp lệ.
       * Xóa session hiện tại.
       */
      localStorage.removeItem(
        ACCESS_TOKEN_KEY,
      );

      return null;
    }
  },

  // =========================
  // Logout
  // =========================

  logout(): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(
      ACCESS_TOKEN_KEY,
    );
  },

  // =========================
  // Check Authentication
  // =========================

  isAuthenticated(): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    return Boolean(
      localStorage.getItem(
        ACCESS_TOKEN_KEY,
      ),
    );
  },

  // =========================
  // Get Access Token
  // =========================

  getAccessToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(
      ACCESS_TOKEN_KEY,
    );
  },
};