import {
  FileCode2,
  FileImage,
  FileText,
  Folder,
  Package,
} from "lucide-react";

import type { TemplateDetailProps } from "./types";

import FileItem from "./included-files/FileItem";

function getFileIcon(name: string) {
  const extension =
    name.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "tsx":
    case "ts":
    case "jsx":
    case "js":
      return FileCode2;

    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
    case "svg":
      return FileImage;

    case "md":
    case "txt":
      return FileText;

    default:
      return Package;
  }
}

export default function TemplateIncludedFiles({
  template,
}: TemplateDetailProps) {
  const images = template.images ?? [];

  if (images.length === 0) {
    return null;
  }

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
      "
    >
      {/* =====================================================
          HEADER
         ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-slate-200
          px-6
          py-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-indigo-50
              text-indigo-600
            "
          >
            <Folder className="h-5 w-5" />
          </div>

          <div>
            <h2
              className="
                text-xl
                font-semibold
                tracking-tight
                text-slate-900
              "
            >
              Included Files
            </h2>

            <p
              className="
                mt-0.5
                text-sm
                text-slate-500
              "
            >
              Files and resources included with this template.
            </p>
          </div>
        </div>

        {/* Item count */}

        <div
          className="
            inline-flex
            w-fit
            items-center
            rounded-full
            border
            border-slate-200
            bg-slate-50
            px-3
            py-1.5
            text-xs
            font-medium
            text-slate-600
          "
        >
          {images.length}{" "}
          {images.length === 1 ? "Item" : "Items"}
        </div>
      </div>

      {/* =====================================================
          FILE LIST
         ===================================================== */}

      <div className="p-6">
        <div
          className="
            grid
            gap-3
            md:grid-cols-2
          "
        >
          {images.map((image, index) => {
            const name =
              image.split("/").pop() ??
              `Image ${index + 1}`;

            const Icon = getFileIcon(name);

            return (
              <div
                key={`${image}-${index}`}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50/50
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-indigo-200
                  hover:bg-white
                  hover:shadow-sm
                "
              >
                {/* Icon */}

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-slate-500
                    shadow-sm
                    ring-1
                    ring-slate-200
                    transition-colors
                    duration-300
                    group-hover:text-indigo-600
                  "
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Existing FileItem */}

                <div className="min-w-0 flex-1">
                  <FileItem
                    name={name}
                    type="file"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          FOOTER
         ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
          border-t
          border-slate-200
          bg-slate-50/70
          px-6
          py-4
          text-xs
          text-slate-500
        "
      >
        <Package className="h-4 w-4" />

        <span>
          All files are included with the template package.
        </span>
      </div>
    </section>
  );
}