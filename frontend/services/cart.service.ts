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

  /**
   * Thêm Template vào Cart
   *
   * styleId là style mà user đã chọn.
   *
   * Nếu không truyền styleId:
   * → sử dụng styleId mặc định của Template
   */
  addTemplate(
    template: MarketplaceTemplate,
    styleId?: string | null
  ) {
    const selectedStyleId =
      styleId ??
      template.styleId ??
      null;

    cartRepository.add(
      template,
      selectedStyleId
    );
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
        const originalPrice =
          item.template.originalPrice;

        if (
          originalPrice === null ||
          originalPrice === undefined
        ) {
          return sum;
        }

        return (
          sum +
          Math.max(
            0,
            originalPrice -
              item.template.price
          ) *
            item.quantity
        );
      }, 0);
  },

  getTotal() {
    return Math.max(
      0,
      this.getSubtotal() -
        this.getDiscount()
    );
  },
};