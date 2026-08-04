import { templateRepository } from "@/repositories/template.repository";
import { Template } from "@/types/template/template";

export const templateService = {

  getAll() {
    return templateRepository.findAll();
  },

  getFeatured() {
    return templateRepository.findFeatured();
  },

  getBySlug(slug: string) {
    return templateRepository.findBySlug(slug);
  },
getRelated(
  template: Template,
  limit = 3
) {
  return templateRepository.findRelated(
    template,
    limit
  );
}
};