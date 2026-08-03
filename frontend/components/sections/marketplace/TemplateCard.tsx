import Image from "next/image";
import { Download } from "lucide-react";

import { Template } from "@/types"; 
import Link from "next/link";
import AppButton from "@/components/common/AppButton";
import Rating from "@/components/common/Rating";
import PriceTag from "@/components/common/PriceTag";

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
          <div className="space-y-2 text-sm">
            <Rating
              value={template.rating}
              reviewCount={template.reviewCount}
            />

            <div className="flex items-center gap-1 text-muted-foreground">
              <Download className="h-4 w-4" />
              <span>{template.downloads} downloads</span>
            </div>
          </div>

          <PriceTag
            price={template.price}
            discountPrice={template.discountPrice}
          />
        </div>

       <Link href={`/templates/${template.slug}`}>
  <AppButton className="w-full">
    Preview
  </AppButton>
</Link>
      </div>
    </article>
  );
}