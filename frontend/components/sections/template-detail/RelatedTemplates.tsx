"use client";

import {
  useEffect,
  useState,
} from "react";

import { templateService } from "@/services/template.service";

import TemplateCard from "@/components/sections/marketplace/cards/TemplateCard";

import type { Template } from "@/types/template/template";

import type {
  MarketplaceTemplate,
} from "@/components/sections/marketplace/types";

import type {
  RelatedTemplatesProps,
} from "./types";

function toMarketplaceTemplate(
  template: Template,
): MarketplaceTemplate {
  return {
    id: template.id,
    slug: template.slug,
    title: template.title,
    description: template.description,

    thumbnail: template.thumbnail,

    images: template.images ?? [],

    category: template.category,

    tags: template.tags ?? [],

    authorId: template.authorId,

    author: {
      name:
        template.author?.name ??
        "Unknown Author",

      avatar:
        template.author?.avatar ??
        "/avatars/default.png",

      verified: false,
    },

    rating: template.rating ?? 0,

    reviews: template.reviews ?? 0,

    downloads: template.downloads ?? 0,

    price: template.price,

    discountPrice:
      template.discountPrice ??
      template.price,

    originalPrice:
      template.originalPrice ??
      undefined,

    featured:
      template.featured ?? false,

    newest:
      template.newest ?? false,

    stock:
      template.stock ??
      undefined,

    license:
      template.license ??
      undefined,
  };
}

export default function RelatedTemplates({
  template,
}: RelatedTemplatesProps) {
  const [related, setRelated] =
    useState<MarketplaceTemplate[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadRelated() {
      try {
        const result =
          await templateService.getRelated(
            template,
          );

        if (cancelled) {
          return;
        }

        const mapped =
          result.map(
            toMarketplaceTemplate,
          );

        setRelated(mapped);
      } catch {
        if (!cancelled) {
          setRelated([]);
        }
      }
    }

    loadRelated();

    return () => {
      cancelled = true;
    };
  }, [template]);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Related Templates
        </h2>

        <p className="text-muted-foreground">
          You may also like these templates.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {related.map((item) => (
          <TemplateCard
            key={item.id}
            template={item}
          />
        ))}
      </div>
    </section>
  );
}