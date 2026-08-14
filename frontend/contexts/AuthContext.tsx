"use client";

import {
  createContext,
  useContext,
} from "react";

import type {
  AuthUser,
  LoginData,
  RegisterData,
} from "@/repositories/auth.repository";

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    data: LoginData,
  ) => Promise<AuthUser>;

  register: (
    data: RegisterData,
  ) => Promise<AuthUser>;

  logout: () => void;

  refreshUser: () => Promise<AuthUser | null>;
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return context;
}