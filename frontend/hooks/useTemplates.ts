import { templateService } from "@/services/template.service";

export function useTemplates() {
  return {
    templates: templateService.getAll(),

    featuredTemplates:
      templateService.getFeatured(),
  };
}