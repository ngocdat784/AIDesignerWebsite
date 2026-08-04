import type { CartItem } from "@/types/cart";
import type { Template } from "@/types/template/template";

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
  findAll(): CartItem[] {
    return loadCart();
  },

  add(template: Template) {
    const items = loadCart();

    const existing = items.find(
      (item) => item.template.id === template.id
    );

    if (existing) {
      existing.quantity++;
    } else {
      items.push({
        id: crypto.randomUUID(),
        template,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
    }

    saveCart(items);
  },

  remove(templateId: string) {
    const items = loadCart().filter(
      (item) => item.template.id !== templateId
    );

    saveCart(items);
  },

  clear() {
    saveCart([]);
  },

  updateQuantity(
    templateId: string,
    quantity: number
  ) {
    const items = loadCart();

    const item = items.find(
      (item) => item.template.id === templateId
    );

    if (!item) return;

    item.quantity = quantity;

    saveCart(items);
  },
};