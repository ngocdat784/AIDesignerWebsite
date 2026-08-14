"use client";

import { ReactNode } from "react";

interface AuthBackgroundProps {
  children?: ReactNode;
}

export default function AuthBackground({
  children,
}: AuthBackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.22),transparent_45%)]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      />

      {/* Top glow */}
      <div className="absolute left-1/2 top-[-220px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[120px]" />

      {/* Left glow */}
      <div className="absolute left-[-180px] top-[25%] h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[120px]" />

      {/* Right glow */}
      <div className="absolute right-[-180px] bottom-[10%] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Decorative orb */}
      <div className="auth-orb auth-orb-one" />

      <div className="auth-orb auth-orb-two" />

      <div className="auth-orb auth-orb-three" />

      {/* Decorative lines */}
      <div className="pointer-events-none absolute left-[8%] top-[18%] h-px w-40 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-[35deg]" />

      <div className="pointer-events-none absolute right-[8%] top-[28%] h-px w-48 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent -rotate-[35deg]" />

      <div className="pointer-events-none absolute bottom-[20%] left-[18%] h-px w-32 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent rotate-[55deg]" />

      {/* Small particles */}
      <div className="absolute left-[15%] top-[22%] h-1 w-1 rounded-full bg-white/50 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

      <div className="absolute left-[78%] top-[18%] h-1 w-1 rounded-full bg-indigo-300/70 shadow-[0_0_12px_rgba(129,140,248,0.9)]" />

      <div className="absolute left-[85%] top-[72%] h-1 w-1 rounded-full bg-violet-300/60 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />

      <div className="absolute left-[10%] top-[76%] h-1 w-1 rounded-full bg-blue-300/60 shadow-[0_0_12px_rgba(147,197,253,0.8)]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        {children}
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}