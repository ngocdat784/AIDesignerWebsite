import { Template } from "@/types/template/template";

export interface CartItem {
  id: string;

  template: Template;

  quantity: number;

  addedAt: string;
}