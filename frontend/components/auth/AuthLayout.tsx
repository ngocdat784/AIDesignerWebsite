"use client";

import { ReactNode } from "react";

import AuthBackground from "./AuthBackground";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <AuthBackground>
      <div className="flex w-full flex-col items-center">
        {/* Branding */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] shadow-lg shadow-indigo-500/10 backdrop-blur-xl">
              <span className="text-lg font-bold text-white">
                AI
              </span>
            </div>
          </div>

          <div className="text-lg font-semibold tracking-tight text-white">
            AI Designer
          </div>

          <p className="mt-1 text-xs text-white/40">
            AI Website Designer Platform
          </p>
        </div>

        {/* Page content */}
        <div className="w-full">
          {children}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} AI Designer
        </p>
      </div>
    </AuthBackground>
  );
}