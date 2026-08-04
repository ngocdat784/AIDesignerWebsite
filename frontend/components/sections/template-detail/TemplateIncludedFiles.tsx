import type { TemplateDetailProps } from "./types";

import FileItem from "./included-files/FileItem";

export default function TemplateIncludedFiles({
  template,
}: TemplateDetailProps) {
  return (
    <section className="space-y-5 rounded-2xl border bg-card p-6">

      <div className="flex items-center justify-between">
  <h2 className="text-2xl font-semibold">
    Included Files
  </h2>

  <span className="text-sm text-muted-foreground">
    {template.includedFiles.length} Items
  </span>
</div>

      <div className="grid gap-3 md:grid-cols-2">

        {template.includedFiles.map((item) => (
          <FileItem
            key={item.name}
            name={item.name}
            type={item.type}
          />
        ))}

      </div>

    </section>
  );
}