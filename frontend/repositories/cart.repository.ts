import type { CartItem } from "@/types/cart";
import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

const STORAGE_KEY = "cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  return raw ? JSON.parse(raw) : [];
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  );
}

export const cartRepository = {
  // =========================
  // Query
  // =========================

  findAll(): CartItem[] {
    return loadCart();
  },

  isInCart(templateId: string) {
    return loadCart().some(
      (item) =>
        item.template.id === templateId
    );
  },

  getItemCount() {
    return loadCart().reduce(
      (count, item) =>
        count + item.quantity,
      0
    );
  },

  // =========================
  // Commands
  // =========================

  add(template: MarketplaceTemplate) {
    const items = loadCart();

    const existing = items.find(
      (item) =>
        item.template.id === template.id
    );

    if (existing) {
      existing.quantity += 1;

      saveCart(items);

      return;
    }

    items.push({
      id: crypto.randomUUID(),
      template,
      quantity: 1,
      addedAt: new Date().toISOString(),
    });

    saveCart(items);
  },

  remove(templateId: string) {
    saveCart(
      loadCart().filter(
        (item) =>
          item.template.id !== templateId
      )
    );
  },

  clear() {
    saveCart([]);
  },

  updateQuantity(
    templateId: string,
    quantity: number
  ) {
    const items = loadCart().map(
      (item) =>
        item.template.id === templateId
          ? {
              ...item,
              quantity,
            }
          : item
    );

    saveCart(items);
  },
};