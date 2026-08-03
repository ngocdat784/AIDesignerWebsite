export interface TemplatePricing {
  price: number;

  discountPrice?: number;

  currency: "USD";

  isPremium: boolean;

  license: "Personal" | "Commercial";
}