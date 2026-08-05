import type { LucideIcon } from "lucide-react";

export interface NavbarItem {
  title: string;

  href: string;

  icon?: LucideIcon;

  badge?: string;

  disabled?: boolean;
}