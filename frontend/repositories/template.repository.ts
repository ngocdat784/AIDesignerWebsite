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
  findRelated(template: Template): Template[] {
  return templates.filter(
    (item) =>
      item.id !== template.id &&
      template.relatedTemplateIds.includes(item.id)
  );
}
};