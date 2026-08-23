"use client";

import {
  useEffect,
  useState,
} from "react";

import { ArrowRight, Sparkles } from "lucide-react";

import Link from "next/link";

import { templateService } from "@/services/template.service";

import TemplateCard from "@/components/sections/marketplace/cards/TemplateCard";

import type { Template } from "@/types/template/template";

import type {
  MarketplaceTemplate,
} from "@/components/sections/marketplace/types";

import type {
  RelatedTemplatesProps,
} from "./types";

// =========================================================
// Template -> MarketplaceTemplate
// =========================================================

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

    rating:
      template.rating ?? 0,

    reviews:
      template.reviews ?? 0,

    downloads:
      template.downloads ?? 0,

    price:
      template.price,

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

// =========================================================
// Component
// =========================================================

export default function RelatedTemplates({
  template,
}: RelatedTemplatesProps) {
  const [related, setRelated] =
    useState<MarketplaceTemplate[]>([]);

  // =======================================================
  // Load related templates
  // =======================================================

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
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* =====================================================
          HEADER
         ===================================================== */}

      <div
        className="
          border-b
          border-slate-200
          bg-gradient-to-r
          from-slate-50
          via-white
          to-indigo-50/50
          px-6
          py-6
          sm:px-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Left */}

          <div className="flex items-start gap-4">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-primary/10
                text-primary
              "
            >
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                <h2
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-900
                  "
                >
                  Related Templates
                </h2>

                <span
                  className="
                    rounded-full
                    bg-slate-100
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    text-slate-600
                  "
                >
                  {related.length}{" "}
                  {related.length === 1
                    ? "Template"
                    : "Templates"}
                </span>
              </div>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                You may also like these templates
                based on this design.
              </p>
            </div>
          </div>

          {/* Marketplace link */}

          <Link
            href="/marketplace"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              transition-all
              duration-200
              hover:border-primary/30
              hover:bg-primary/5
              hover:text-primary
            "
          >
            Browse Marketplace

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>

      {/* =====================================================
          TEMPLATES GRID
         ===================================================== */}

      <div className="p-6 sm:p-8">
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {related.map((item) => (
            <div
              key={item.id}
              className="
                min-w-0
                transition-transform
                duration-300
                hover:-translate-y-1
              "
            >
              <TemplateCard
                template={item}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}