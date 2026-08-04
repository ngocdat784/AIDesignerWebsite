"use client";

import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import AppButton from "./AppButton";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({
  className,
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AppButton
        variant="outline"
        size="icon"
        className={className}
      >
        <Sun className="h-5 w-5 opacity-0" />
      </AppButton>
    );
  }

  const dark =
    resolvedTheme === "dark";

  return (
    <AppButton
      title={
        dark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      variant="outline"
      size="icon"
      className={`
        relative
        overflow-hidden
        transition-all
        duration-300
        hover:scale-105
        active:scale-95
        ${className ?? ""}
      `}
      onClick={() =>
        setTheme(
          dark
            ? "light"
            : "dark"
        )
      }
    >
      {dark ? (
        <Sun
          className="
            h-5
            w-5
            rotate-0
            scale-100
            transition-all
            duration-500
            hover:rotate-180
          "
        />
      ) : (
        <Moon
          className="
            h-5
            w-5
            rotate-0
            scale-100
            transition-all
            duration-500
            hover:-rotate-12
          "
        />
      )}
    </AppButton>
  );
}