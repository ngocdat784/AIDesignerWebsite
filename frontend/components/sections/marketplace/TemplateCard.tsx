import Image from "next/image";
import { Star, Download } from "lucide-react";

import { Template } from "@/types";

import AppButton from "@/components/common/AppButton";

interface Props {
  template: Template;
}

export default function TemplateCard({
  template,
}: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative aspect-[16/10] overflow-hidden">

        <Image
          src={template.thumbnail}
          alt={template.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

      </div>

      <div className="space-y-4 p-6">

        <div>

          <h3 className="text-xl font-semibold">
            {template.title}
          </h3>

          <p className="mt-2 text-muted-foreground">
            {template.description}
          </p>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4 text-sm">

            <span className="flex items-center gap-1">

              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

              {template.rating}

            </span>

            <span className="flex items-center gap-1">

              <Download className="h-4 w-4" />

              {template.downloads}

            </span>

          </div>

          <div className="text-xl font-bold">

            ${template.discountPrice ?? template.price}

          </div>

        </div>

        <AppButton className="w-full">

          Preview

        </AppButton>

      </div>

    </article>
  );
}