import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

export interface CartItem {
  id: string;

  template: MarketplaceTemplate;

  quantity: number;

  addedAt: string;
}