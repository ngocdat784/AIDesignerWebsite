"use client";

import type { TemplateDetailProps } from "./types";

import GalleryControls from "./gallery/GalleryControls";
import GalleryThumbnail from "./gallery/GalleryThumbnail";
import { useGallery } from "./gallery/useGallery";

export type TemplateGalleryVariant =
  | "modern"
  | "minimal"
  | "dark"
  | "glass";

interface TemplateGalleryProps extends TemplateDetailProps {
  variant?: TemplateGalleryVariant;
}

const variantStyles = {
  modern: {
    section:
      "rounded-3xl border border-slate-200 bg-white shadow-sm",

    stage:
      "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.10),transparent_45%)]",

    browser:
      "border-slate-200 bg-white shadow-2xl shadow-slate-900/10",

    browserBar:
      "border-slate-200 bg-slate-50",

    browserAddress:
      "bg-slate-200",

    content:
      "bg-white",

    info:
      "border-slate-200 bg-white",

    infoTitle:
      "text-slate-950",

    infoText:
      "text-slate-500",
  },

  minimal: {
    section:
      "rounded-3xl border border-stone-200 bg-white",

    stage:
      "bg-stone-50",

    browser:
      "border-stone-200 bg-white shadow-lg",

    browserBar:
      "border-stone-200 bg-stone-50",

    browserAddress:
      "bg-stone-200",

    content:
      "bg-white",

    info:
      "border-stone-200 bg-white",

    infoTitle:
      "text-stone-950",

    infoText:
      "text-stone-500",
  },

  dark: {
    section:
      "rounded-3xl border border-white/10 bg-[#06070a] text-white shadow-2xl",

    stage:
      "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_45%)]",

    browser:
      "border-white/10 bg-[#0d0f14] shadow-2xl",

    browserBar:
      "border-white/10 bg-[#11131a]",

    browserAddress:
      "bg-white/5",

    content:
      "bg-[#0d0f14]",

    info:
      "border-white/10 bg-white/[0.03]",

    infoTitle:
      "text-white",

    infoText:
      "text-white/50",
  },

  glass: {
    section:
      "rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl",

    stage:
      "bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.25),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(236,72,153,0.18),transparent_30%)]",

    browser:
      "border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl",

    browserBar:
      "border-white/10 bg-white/10",

    browserAddress:
      "bg-white/10",

    content:
      "bg-white/5",

    info:
      "border-white/10 bg-white/10 backdrop-blur-xl",

    infoTitle:
      "text-white",

    infoText:
      "text-white/60",
  },
};

export default function TemplateGallery({
  template,
  variant = "modern",
}: TemplateGalleryProps) {
  const {
    images,
    current,
    setCurrent,
    next,
    previous,
  } = useGallery(template);

  const styles = variantStyles[variant];

  /*
   * Nếu gallery không có ảnh thì dùng fallback.
   */
  const currentImage =
    images[current] ||
    template.coverImage ||
    template.images?.[0] ||
    template.gallery?.[0] ||
    template.thumbnail ||
    null;

  return (
    <section
      className={`
        ${styles.section}
        overflow-hidden
        transition-all
        duration-500
      `}
      data-preview-variant={variant}
    >
      {/* =====================================================
          PREVIEW STAGE
      ===================================================== */}

      <div
        className={`
          ${styles.stage}
          relative
          overflow-hidden
          p-4
          sm:p-6
          lg:p-10
        `}
      >
        {/* Decorative background */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-indigo-500/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-32
            h-96
            w-96
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        {/* =================================================
            BROWSER MOCKUP
        ================================================= */}

        <div
          className={`
            ${styles.browser}
            relative
            z-10
            mx-auto
            max-w-6xl
            overflow-hidden
            rounded-2xl
            border
            transition-all
            duration-500
          `}
        >
          {/* Browser Header */}

          <div
            className={`
              ${styles.browserBar}
              flex
              items-center
              gap-3
              border-b
              px-4
              py-3
            `}
          >
            {/* Browser controls */}

            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>

            {/* Fake address bar */}

            <div
              className={`
                ${styles.browserAddress}
                mx-auto
                h-7
                max-w-md
                flex-1
                rounded-lg
              `}
            />

            <div className="hidden w-16 sm:block" />
          </div>

          {/* =================================================
              REAL TEMPLATE IMAGE
          ================================================= */}

          <div
            className={`
              ${styles.content}
              relative
              overflow-hidden
            `}
          >
            {currentImage ? (
              <div className="relative">
                <img
                  src={currentImage}
                  alt={`${template.title} preview`}
                  className="
                    block
                    h-auto
                    max-h-[720px]
                    w-full
                    object-cover
                    object-top
                  "
                />

                {/* Bottom gradient */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-24
                    bg-gradient-to-t
                    from-black/10
                    to-transparent
                  "
                />
              </div>
            ) : (
              <div
                className="
                  flex
                  min-h-[420px]
                  items-center
                  justify-center
                  bg-slate-100
                "
              >
                <div className="text-center">
                  <div
                    className="
                      mx-auto
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-2xl
                      bg-indigo-600
                      text-xl
                      font-bold
                      text-white
                    "
                  >
                    {template.title
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-900">
                    {template.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Template Preview
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            TEMPLATE INFORMATION
        ===================================================== */}

        <div
          className={`
            ${styles.info}
            relative
            z-10
            mx-auto
            mt-6
            max-w-6xl
            rounded-2xl
            border
            p-5
            transition-all
            duration-500
            sm:p-6
          `}
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
            <div className="min-w-0 space-y-2">
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                {template.category && (
                  <span
                    className="
                      rounded-full
                      bg-indigo-500/10
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-indigo-600
                    "
                  >
                    {template.category}
                  </span>
                )}

                <span
                  className="
                    rounded-full
                    bg-slate-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  Live Preview
                </span>
              </div>

              <h2
                className={`
                  ${styles.infoTitle}
                  truncate
                  text-xl
                  font-bold
                `}
              >
                {template.title}
              </h2>

              <p
                className={`
                  ${styles.infoText}
                  max-w-2xl
                  text-sm
                  leading-6
                `}
              >
                {template.description}
              </p>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <p
                className={`
                  ${styles.infoText}
                  text-xs
                `}
              >
                Rating
              </p>

              <p
                className={`
                  ${styles.infoTitle}
                  mt-1
                  text-lg
                  font-bold
                `}
              >
                {template.rating
                  ? `${template.rating.toFixed(1)} / 5`
                  : "No rating"}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            GALLERY CONTROLS
        ===================================================== */}

        {images.length > 1 && (
          <div
            className="
              relative
              z-10
              mx-auto
              mt-5
              flex
              max-w-6xl
              items-center
              justify-between
              gap-4
            "
          >
            <GalleryControls
              onNext={next}
              onPrevious={previous}
            />

            <span className="text-xs text-muted-foreground">
              Screenshot {current + 1} / {images.length}
            </span>
          </div>
        )}

        {/* =====================================================
            THUMBNAILS
        ===================================================== */}

        {images.length > 1 && (
          <div
            className="
              relative
              z-10
              mx-auto
              mt-4
              grid
              max-w-6xl
              grid-cols-3
              gap-3
              sm:grid-cols-4
              md:grid-cols-5
              lg:grid-cols-6
            "
          >
            {images.map((image, index) => (
              <GalleryThumbnail
                key={`${image}-${index}`}
                image={image}
                active={current === index}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}