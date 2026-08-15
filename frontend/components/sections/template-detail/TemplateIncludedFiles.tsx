import type { TemplateDetailProps } from "./types";

import FileItem from "./included-files/FileItem";

export default function TemplateIncludedFiles({
  template,
}: TemplateDetailProps) {
  const images = template.images ?? [];

  return (
    <section className="space-y-5 rounded-2xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Included Files
        </h2>

        <span className="text-sm text-muted-foreground">
          {images.length} Items
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {images.map((image, index) => (
          <FileItem
            key={`${image}-${index}`}
            name={
              image.split("/").pop() ??
              `Image ${index + 1}`
            }
            type="file"
          />
        ))}
      </div>
    </section>
  );
}