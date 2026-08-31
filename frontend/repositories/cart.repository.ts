import type { CartItem } from "@/types/cart";

import type {
  MarketplaceTemplate,
  MarketplaceTemplateStyle,
} from "@/components/sections/marketplace/types";

const STORAGE_KEY = "cart";

// =========================================================
// LOAD CART
// =========================================================

function loadCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw =
      localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw) as CartItem[];
  } catch (error) {
    console.error(
      "Failed to load cart:",
      error
    );

    return [];
  }
}

// =========================================================
// SAVE CART
// =========================================================

function saveCart(
  items: CartItem[]
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  } catch (error) {
    console.error(
      "Failed to save cart:",
      error
    );
  }
}

// =========================================================
// FIND STYLE
// =========================================================

function resolveSelectedStyle(
  template: MarketplaceTemplate,
  styleId?: string | null
): MarketplaceTemplateStyle | null {
  const selectedStyleId =
    styleId ??
    template.styleId ??
    null;

  if (!selectedStyleId) {
    return null;
  }

  if (
    template.style &&
    template.style.id ===
      selectedStyleId
  ) {
    return template.style;
  }

  return null;
}

// =========================================================
// STYLE MATCH
// =========================================================

function isSameStyle(
  item: CartItem,
  styleId?: string | null
): boolean {
  return (
    (item.styleId ?? null) ===
    (styleId ?? null)
  );
}

// =========================================================
// REPOSITORY
// =========================================================

export const cartRepository = {
  // =======================================================
  // QUERY
  // =======================================================

  findAll(): CartItem[] {
    return loadCart();
  },

  /**
   * Kiểm tra Template + Style đã tồn tại trong Cart chưa.
   */
  isInCart(
    templateId: string,
    styleId?: string | null
  ): boolean {
    return loadCart().some(
      (item) =>
        item.template.id ===
          templateId &&
        isSameStyle(
          item,
          styleId
        )
    );
  },

  /**
   * Lấy CartItem cụ thể theo Template + Style.
   */
  getItem(
    templateId: string,
    styleId?: string | null
  ): CartItem | undefined {
    return loadCart().find(
      (item) =>
        item.template.id ===
          templateId &&
        isSameStyle(
          item,
          styleId
        )
    );
  },

  /**
   * Tổng số lượng sản phẩm trong Cart.
   */
  getItemCount(): number {
    return loadCart().reduce(
      (count, item) =>
        count + item.quantity,
      0
    );
  },

  // =======================================================
  // ADD
  // =======================================================

  /**
   * Thêm Template + Style vào Cart.
   *
   * Cùng Template:
   *
   * Template A + Modern
   * Template A + Dark
   *
   * được xem là 2 CartItem khác nhau.
   */
  add(
    template: MarketplaceTemplate,
    styleId?: string | null
  ): void {
    const items = loadCart();

    const selectedStyleId =
      styleId ??
      template.styleId ??
      null;

    const selectedStyle =
      resolveSelectedStyle(
        template,
        selectedStyleId
      );

    const existing =
      items.find(
        (item) =>
          item.template.id ===
            template.id &&
          isSameStyle(
            item,
            selectedStyleId
          )
      );

    // =====================================================
    // EXISTING
    // =====================================================

    if (existing) {
      existing.quantity += 1;

      saveCart(items);

      return;
    }

    // =====================================================
    // NEW
    // =====================================================

    const cartItem: CartItem = {
      id: crypto.randomUUID(),

      template,

      styleId:
        selectedStyleId,

      style:
        selectedStyle,

      quantity: 1,

      addedAt:
        new Date().toISOString(),
    };

    items.push(cartItem);

    saveCart(items);
  },

  // =======================================================
  // REMOVE
  // =======================================================

  /**
   * Xóa một Template + Style cụ thể.
   *
   * Nếu không truyền styleId:
   * → xóa tất cả style của Template.
   *
   * Nếu truyền styleId:
   * → chỉ xóa đúng style đó.
   */
  remove(
    templateId: string,
    styleId?: string | null
  ): void {
    const items =
      loadCart();

    // Không truyền style
    // → giữ nguyên behavior cũ:
    // xóa toàn bộ Template.
    if (
      styleId === undefined
    ) {
      saveCart(
        items.filter(
          (item) =>
            item.template.id !==
            templateId
        )
      );

      return;
    }

    // Có style
    // → chỉ xóa Template + Style đó.
    saveCart(
      items.filter(
        (item) =>
          !(
            item.template.id ===
              templateId &&
            isSameStyle(
              item,
              styleId
            )
          )
      )
    );
  },

  // =======================================================
  // CLEAR
  // =======================================================

  clear(): void {
    saveCart([]);
  },

  // =======================================================
  // UPDATE QUANTITY
  // =======================================================

  /**
   * Cập nhật quantity của Template + Style.
   *
   * Nếu không truyền styleId:
   * → cập nhật tất cả style của Template.
   *
   * Nếu truyền styleId:
   * → chỉ cập nhật đúng CartItem đó.
   */
  updateQuantity(
    templateId: string,
    quantity: number,
    styleId?: string | null
  ): void {
    const items =
      loadCart();

    // Không truyền style
    // → behavior cũ
    if (
      styleId === undefined
    ) {
      saveCart(
        items.map(
          (item) =>
            item.template.id ===
            templateId
              ? {
                  ...item,
                  quantity,
                }
              : item
        )
      );

      return;
    }

    // Có style
    // → chỉ update đúng style.
    saveCart(
      items.map(
        (item) =>
          item.template.id ===
            templateId &&
          isSameStyle(
            item,
            styleId
          )
            ? {
                ...item,
                quantity,
              }
            : item
      )
    );
  },
};