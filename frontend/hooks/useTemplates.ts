import { templateService } from "@/services/template.service";

export function useTemplates() {
  const templates = templateService.getAll();

  const featuredTemplates =
    templateService.getFeatured();

  return {
    templates,
    featuredTemplates,
  };
}