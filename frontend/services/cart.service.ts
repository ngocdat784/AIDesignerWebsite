import { cartRepository } from "@/repositories/cart.repository";
import type { Template } from "@/types/template/template";

export const cartService = {
  getItems() {
    return cartRepository.findAll();
  },

  addTemplate(template: Template) {
    cartRepository.add(template);
  },

  removeTemplate(templateId: string) {
    cartRepository.remove(templateId);
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

  getSubtotal() {
    return cartRepository
      .findAll()
      .reduce((sum, item) => {
        const price =
          item.template.discountPrice ??
          item.template.price;

        return sum + price * item.quantity;
      }, 0);
  },

  getDiscount() {
    return cartRepository
      .findAll()
      .reduce((sum, item) => {
        if (!item.template.discountPrice) {
          return sum;
        }

        return (
          sum +
          (item.template.price -
            item.template.discountPrice) *
            item.quantity
        );
      }, 0);
  },

  getTotal() {
    return this.getSubtotal();
  },
};