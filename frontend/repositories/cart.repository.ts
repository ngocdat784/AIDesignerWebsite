import type { CartItem } from "@/types/cart";
import type { Template } from "@/types/template/template";

let cart: CartItem[] = [];

export const cartRepository = {
  findAll(): CartItem[] {
    return cart;
  },

  add(template: Template) {
    const existing = cart.find(
      (item) => item.template.id === template.id
    );

    if (existing) {
      existing.quantity++;
      return;
    }

    cart.push({
      id: crypto.randomUUID(),
      template,
      quantity: 1,
      addedAt: new Date().toISOString(),
    });
  },

  remove(templateId: string) {
    cart = cart.filter(
      (item) => item.template.id !== templateId
    );
  },

  clear() {
    cart = [];
  },

  updateQuantity(
    templateId: string,
    quantity: number
  ) {
    const item = cart.find(
      (item) => item.template.id === templateId
    );

    if (!item) return;

    item.quantity = quantity;
  },
};