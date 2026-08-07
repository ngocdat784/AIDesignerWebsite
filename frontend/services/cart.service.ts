import { cartRepository } from "@/repositories/cart.repository";

import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

export const cartService = {
  // =========================
  // Query
  // =========================

  getAll() {
    return cartRepository.findAll();
  },

  getItem(templateId: string) {
    return cartRepository
      .findAll()
      .find(
        (item) =>
          item.template.id === templateId
      );
  },

  getItemCount() {
    return cartRepository
      .findAll()
      .reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      );
  },

  isInCart(templateId: string) {
    return cartRepository
      .findAll()
      .some(
        (item) =>
          item.template.id === templateId
      );
  },

  // =========================
  // Commands
  // =========================

  addTemplate(
    template: MarketplaceTemplate
  ) {
    cartRepository.add(template);
  },

  removeTemplate(
    templateId: string
  ) {
    cartRepository.remove(
      templateId
    );
  },

  clear() {
    cartRepository.clear();
  },

  updateQuantity(
    templateId: string,
    quantity: number
  ) {
    cartRepository.updateQuantity(
      templateId,
      quantity
    );
  },

  // =========================
  // Calculations
  // =========================

  getSubtotal() {
    return cartRepository
      .findAll()
      .reduce((sum, item) => {
        return (
          sum +
          item.template.price *
            item.quantity
        );
      }, 0);
  },

  getDiscount() {
    return cartRepository
      .findAll()
      .reduce((sum, item) => {
        if (
          !item.template.originalPrice
        ) {
          return sum;
        }

        return (
          sum +
          (item.template.originalPrice -
            item.template.price) *
            item.quantity
        );
      }, 0);
  },

  getTotal() {
    return this.getSubtotal();
  },
};