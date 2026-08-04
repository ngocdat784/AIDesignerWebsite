import { templates } from "@/data/templates";
import { Template } from "@/types";

export const templateRepository = {
  findAll(): Template[] {
    return templates;
  },

  findById(id: string): Template | undefined {
    return templates.find((item) => item.id === id);
  },

  findBySlug(slug: string): Template | undefined {
    return templates.find((item) => item.slug === slug);
  },

  findFeatured(): Template[] {
    return templates.filter((item) => item.isFeatured);
  },
  findRelated(current: Template, limit = 3): Template[] {
  return templates
    .filter((item) => {
      if (item.id === current.id) {
        return false;
      }

      const sameCategory =
        item.category === current.category;

      const sameTags =
        item.tags.some((tag) =>
          current.tags.includes(tag)
        );

      return sameCategory || sameTags;
    })
    .slice(0, limit);
}

};