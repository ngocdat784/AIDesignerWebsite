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
  },

  minimal: {
    section:
      "rounded-3xl border border-stone-200 bg-white shadow-sm",

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
   * Lấy ảnh hiện tại.
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
        w-full
        overflow-hidden
        transition-all
        duration-500
      `}
      data-preview-variant={variant}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "40px",
      }}
    >
      {/* =====================================================
          PREVIEW STAGE
      ===================================================== */}

      <div
        className={`
          ${styles.stage}
          relative
          overflow-hidden
          px-3
          py-4
          sm:px-5
          sm:py-5
          lg:px-7
          lg:py-7
        `}
      >
        {/* =====================================================
            DECORATIVE BACKGROUND
        ===================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-80
            w-80
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
            h-80
            w-80
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        {/* =====================================================
            BROWSER MOCKUP
        ===================================================== */}

        <div
          className={`
            ${styles.browser}
            relative
            z-10
            max-w-6xl
            overflow-hidden
            rounded-2xl
            border
            transition-all
            duration-500
          `}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
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
              py-2.5
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
                h-6
                max-w-md
                flex-1
                rounded-lg
              `}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />

            <div className="hidden w-16 sm:block" />
          </div>

          {/* =====================================================
              TEMPLATE IMAGE
          ===================================================== */}

          <div
            className={`
              ${styles.content}
              relative
              overflow-hidden
            `}
          >
            {currentImage ? (
              <div
                className="relative"
                style={{
                  maxHeight: "520px",
                }}
              >
                <img
                  src={currentImage}
                  alt={`${template.title} preview`}
                  className="
                    block
                    w-full
                    object-cover
                    object-top
                  "
                  style={{
                    height: "min(520px, 48vw)",
                    minHeight: "320px",
                  }}
                />

                {/* Bottom gradient */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-20
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
                  min-h-[320px]
                  items-center
                  justify-center
                  bg-slate-100
                "
              >
                <div
                  className="text-center"
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-indigo-600
                      text-lg
                      font-bold
                      text-white
                    "
                  >
                    {template.title
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-slate-900
                    "
                    style={{
                      marginTop: "14px",
                    }}
                  >
                    Preview unavailable
                  </p>
                </div>
              </div>
            )}
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
              flex
              max-w-6xl
              items-center
              justify-between
              gap-4
            "
            style={{
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <GalleryControls
              onNext={next}
              onPrevious={previous}
            />

            <span
              className="
                text-xs
                font-medium
                text-muted-foreground
              "
            >
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
              grid
              max-w-6xl
              grid-cols-3
              gap-3
              sm:grid-cols-4
              md:grid-cols-5
              lg:grid-cols-6
            "
            style={{
              marginTop: "14px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
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