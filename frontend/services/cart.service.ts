import { cartRepository } from "@/repositories/cart.repository";

import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

export const cartService = {
  // =========================================================
  // QUERY
  // =========================================================

  getAll() {
    return cartRepository.findAll();
  },

  /**
   * Tìm một CartItem theo Template + Style.
   *
   * Template giống nhau nhưng Style khác nhau
   * được xem là 2 CartItem khác nhau.
   */
  getItem(
    templateId: string,
    styleId?: string | null
  ) {
    const selectedStyleId =
      styleId ?? null;

    return cartRepository
      .findAll()
      .find(
        (item) =>
          item.template.id === templateId &&
          (item.styleId ?? null) ===
            selectedStyleId
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

  /**
   * Kiểm tra Template + Style đã có trong Cart chưa.
   */
  isInCart(
    templateId: string,
    styleId?: string | null
  ) {
    const selectedStyleId =
      styleId ?? null;

    return cartRepository
      .findAll()
      .some(
        (item) =>
          item.template.id === templateId &&
          (item.styleId ?? null) ===
            selectedStyleId
      );
  },

  // =========================================================
  // COMMANDS
  // =========================================================

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
    templateId: string,
    styleId?: string | null
  ) {
    cartRepository.remove(
      templateId,
      styleId
    );
  },

  clear() {
    cartRepository.clear();
  },

  updateQuantity(
    templateId: string,
    quantity: number,
    styleId?: string | null
  ) {
    cartRepository.updateQuantity(
      templateId,
      quantity,
      styleId
    );
  },

  // =========================================================
  // CALCULATIONS
  // =========================================================

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