import type { MarketplaceTemplateStyle } from "@/components/sections/marketplace/types";
import type { MarketplaceTemplate } from "@/components/sections/marketplace/types";

export interface CartItem {
  // =========================
  // Cart item
  // =========================

  id: string;

  // =========================
  // Template
  // =========================

  template: MarketplaceTemplate;

  // =========================
  // Selected Style
  // =========================

  /**
   * ID của style mà USER thực tế đã chọn.
   *
   * Khác với template.styleId:
   * - template.styleId = style mặc định của Template
   * - CartItem.styleId = style user mua
   */
  styleId?: string | null;

  /**
   * Snapshot thông tin style tại thời điểm
   * user thêm Template vào Cart.
   */
  style?: MarketplaceTemplateStyle | null;

  // =========================
  // Quantity
  // =========================

  quantity: number;

  // =========================
  // Timestamp
  // =========================

  addedAt: string;
}