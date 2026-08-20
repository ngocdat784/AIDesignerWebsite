"use client";

import type {
  TemplatePreviewStyle,
} from "./types";

const styles: {
  id: TemplatePreviewStyle;
  name: string;
  description: string;
}[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean & professional",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple & elegant",
  },
  {
    id: "dark",
    name: "Dark",
    description: "Bold & futuristic",
  },
  {
    id: "glass",
    name: "Glass",
    description: "Glassmorphism",
  },
];

interface Props {
  value: TemplatePreviewStyle;
  onChange: (
    value: TemplatePreviewStyle
  ) => void;
}

export default function TemplatePreviewSelector({
  value,
  onChange,
}: Props) {
  return (
    <aside className="w-64 shrink-0 border-r bg-white p-4">

      <h3 className="mb-1 text-sm font-semibold">
        Preview Styles
      </h3>

      <p className="mb-5 text-xs text-muted-foreground">
        Choose a design
      </p>

      <div className="space-y-2">
        {styles.map((style) => {
          const active =
            value === style.id;

          return (
            <button
              key={style.id}
              type="button"
              onClick={() =>
                onChange(style.id)
              }
              className={`
                w-full rounded-xl border p-3
                text-left transition-all
                ${
                  active
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:bg-muted"
                }
              `}
            >
              <div className="font-medium">
                {style.name}
              </div>

              <div className="mt-1 text-xs text-muted-foreground">
                {style.description}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}