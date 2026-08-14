"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  AuthContext,
  type AuthContextValue,
} from "@/contexts/AuthContext";

import {
  authService,
} from "@/services/auth.service";

import type {
  AuthUser,
  LoginData,
  RegisterData,
} from "@/repositories/auth.repository";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  // =========================
  // Restore Session
  // =========================

  useEffect(() => {
    let mounted = true;

    async function restoreSession() {
      try {
        const currentUser =
          await authService.restoreSession();

        if (mounted) {
          setUser(currentUser);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  // =========================
  // Login
  // =========================

  async function login(
    data: LoginData,
  ): Promise<AuthUser> {
    const loggedInUser =
      await authService.login(data);

    setUser(loggedInUser);

    return loggedInUser;
  }

  // =========================
  // Register
  // =========================

  async function register(
    data: RegisterData,
  ): Promise<AuthUser> {
    const registeredUser =
      await authService.register(data);

    return registeredUser;
  }

  // =========================
  // Logout
  // =========================

  function logout() {
    authService.logout();

    setUser(null);
  }

  // =========================
  // Refresh User
  // =========================

  async function refreshUser(): Promise<
    AuthUser | null
  > {
    const currentUser =
      await authService.restoreSession();

    setUser(currentUser);

    return currentUser;
  }

  // =========================
  // Context Value
  // =========================

  const value: AuthContextValue = {
    user,

    isAuthenticated:
      user !== null,

    isLoading,

    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}