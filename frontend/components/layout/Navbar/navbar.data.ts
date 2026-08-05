import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Store,
} from "lucide-react";

import type { NavbarItem } from "./types";

export const navbarLinks: NavbarItem[] = [
  {
    title: "Marketplace",
    href: "/",
    icon: Store,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: LayoutDashboard,
  },
  {
    title: "AI Builder",
    href: "/builder",
    icon: Bot,
    badge: "NEW",
  },
  {
    title: "Pricing",
    href: "/pricing",
    icon: CreditCard,
  },
];