"use client";

import { LayoutGrid, List } from "lucide-react";

import AppButton from "@/components/common/AppButton";

import { useMarketplace } from "./hooks/useMarketplace";

export default function ViewModeSwitcher() {
  const {
    view,
    setView,
  } = useMarketplace();

  return (
    <div className="flex rounded-xl border overflow-hidden">

      <AppButton
        variant={
          view === "grid"
            ? "default"
            : "ghost"
        }
        className="rounded-none"
        onClick={() => setView("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </AppButton>

      <AppButton
        variant={
          view === "list"
            ? "default"
            : "ghost"
        }
        className="rounded-none"
        onClick={() => setView("list")}
      >
        <List className="h-4 w-4" />
      </AppButton>

    </div>
  );
}