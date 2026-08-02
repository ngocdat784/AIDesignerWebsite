import { Template } from "@/types";

interface FilterOptions {
  category?: string;
  search?: string;
}

export function filterTemplates(
  templates: Template[],
  options: FilterOptions
) {
  return templates.filter((item) => {
    const matchCategory =
      !options.category ||
      options.category === "All" ||
      item.category === options.category;

    const keyword = options.search?.toLowerCase() ?? "";

    const matchSearch =
      keyword === "" ||
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });
}