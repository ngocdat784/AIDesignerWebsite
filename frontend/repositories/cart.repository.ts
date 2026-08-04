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

    const exists = items.some(
      (item) => item.template.id === template.id
    );

    const updatedItems = exists
      ? items.map((item) =>
          item.template.id === template.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      : [
          ...items,
          {
            id: crypto.randomUUID(),
            template,
            quantity: 1,
            addedAt: new Date().toISOString(),
          },
        ];

    saveCart(updatedItems);
  },

  remove(templateId: string) {
    const updatedItems = loadCart().filter(
      (item) => item.template.id !== templateId
    );

    saveCart(updatedItems);
  },

  clear() {
    saveCart([]);
  },

  updateQuantity(
    templateId: string,
    quantity: number
  ) {
    const updatedItems = loadCart().map((item) =>
      item.template.id === templateId
        ? {
            ...item,
            quantity,
          }
        : item
    );

    saveCart(updatedItems);
  },

  isInCart(templateId: string) {
    return loadCart().some(
      (item) => item.template.id === templateId
    );
  },

  getItemCount() {
    return loadCart().reduce(
      (count, item) => count + item.quantity,
      0
    );
  },
};