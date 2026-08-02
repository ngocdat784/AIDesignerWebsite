import { templates } from "@/data/templates";

export const templateService = {
  getAll() {
    return templates;
  },

  getFeatured() {
    return templates.filter(
      (item) => item.isFeatured
    );
  },

  getBySlug(slug: string) {
    return templates.find(
      (item) => item.slug === slug
    );
  },
};