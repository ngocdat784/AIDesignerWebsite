import type { CartItem } from "@/types/cart";
import type {
  MarketplaceTemplate,
  MarketplaceTemplateStyle,
} from "@/components/sections/marketplace/types";

const STORAGE_KEY = "cart";

// =========================
// Load Cart
// =========================

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

// =========================
// Save Cart
// =========================

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

// =========================
// Find Style
// =========================

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

  // Nếu template có object style và
  // đúng với styleId được chọn
  if (
    template.style &&
    template.style.id ===
      selectedStyleId
  ) {
    return template.style;
  }

  // Không tìm được object style
  // thì vẫn giữ styleId.
  return null;
}

// =========================
// Repository
// =========================

export const cartRepository = {
  // =========================
  // Query
  // =========================

  findAll(): CartItem[] {
    return loadCart();
  },

  isInCart(
    templateId: string,
    styleId?: string | null
  ): boolean {
    const items = loadCart();

    const selectedStyleId =
      styleId ?? null;

    return items.some(
      (item) =>
        item.template.id ===
          templateId &&
        (item.styleId ?? null) ===
          selectedStyleId
    );
  },

  getItemCount(): number {
    return loadCart().reduce(
      (count, item) =>
        count + item.quantity,
      0
    );
  },

  // =========================
  // Commands
  // =========================

  /**
   * Thêm Template vào Cart.
   *
   * Một Template có thể xuất hiện
   * nhiều lần nếu khác style.
   *
   * Template A + Style 1
   * Template A + Style 2
   *
   * = 2 CartItem khác nhau.
   */
  add(
    template: MarketplaceTemplate,
    styleId?: string | null
  ): void {
    const items = loadCart();

    // =========================
    // Resolve Style
    // =========================

    const selectedStyleId =
      styleId ??
      template.styleId ??
      null;

    const selectedStyle =
      resolveSelectedStyle(
        template,
        selectedStyleId
      );

    // =========================
    // Find existing item
    // =========================

    const existing =
      items.find(
        (item) =>
          item.template.id ===
            template.id &&
          (item.styleId ?? null) ===
            selectedStyleId
      );

    // =========================
    // Existing
    // =========================

    if (existing) {
      existing.quantity += 1;

      saveCart(items);

      return;
    }

    // =========================
    // New CartItem
    // =========================

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

  // =========================
  // Remove
  // =========================

  /**
   * Xóa toàn bộ item của Template.
   *
   * Nếu Template có nhiều style,
   * tất cả style của Template sẽ bị xóa.
   */
  remove(
    templateId: string
  ): void {
    saveCart(
      loadCart().filter(
        (item) =>
          item.template.id !==
          templateId
      )
    );
  },

  // =========================
  // Clear
  // =========================

  clear(): void {
    saveCart([]);
  },

  // =========================
  // Update Quantity
  // =========================

  /**
   * Cập nhật quantity của Template.
   *
   * Lưu ý:
   * Nếu cùng Template có nhiều style,
   * method này sẽ cập nhật tất cả.
   *
   * Nếu UI cần chỉnh riêng từng style,
   * nên chuyển sang update bằng CartItem.id
   * hoặc Template + styleId.
   */
  updateQuantity(
    templateId: string,
    quantity: number
  ): void {
    const items =
      loadCart().map(
        (item) =>
          item.template.id ===
          templateId
            ? {
                ...item,
                quantity,
              }
            : item
      );

    saveCart(items);
  },
};