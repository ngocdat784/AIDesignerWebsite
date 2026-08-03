import Image from "next/image";

import { Template } from "@/types";

import PriceTag from "@/components/common/PriceTag";
import Rating from "@/components/common/Rating";
import AppButton from "@/components/common/AppButton";

interface Props {
  template: Template;
}

export default function TemplateListCard({
  template,
}: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg md:flex-row">

      <div className="relative h-56 md:h-auto md:w-80">
        <Image
          src={template.thumbnail}
          alt={template.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">

        <div className="space-y-3">

          <div>

            <h2 className="text-2xl font-semibold">
              {template.title}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {template.description}
            </p>

          </div>

          <Rating
            value={template.rating}
            reviewCount={template.reviewCount}
          />

        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <PriceTag
            price={template.price}
            discountPrice={template.discountPrice}
          />

          <div className="flex gap-3">

            <AppButton variant="outline">
              Live Preview
            </AppButton>

            <AppButton>
              Buy Now
            </AppButton>

          </div>

        </div>

      </div>

    </article>
  );
}