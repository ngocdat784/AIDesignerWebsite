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

interface TemplateGalleryProps
  extends TemplateDetailProps {
  variant?: TemplateGalleryVariant;
}

const variantStyles = {
  modern: {
    section:
      "rounded-3xl border border-slate-200 bg-white shadow-sm",

    stage:
      "bg-gradient-to-br from-slate-50 via-white to-blue-50",

    browser:
      "border-slate-200 bg-white shadow-2xl",

    browserBar:
      "border-slate-200 bg-slate-50",

    browserAddress:
      "bg-slate-200",

    content:
      "bg-white",

    logo:
      "bg-slate-900",

    nav:
      "bg-slate-100",

    hero:
      "bg-gradient-to-br from-blue-50 via-white to-indigo-50",

    heroTitle:
      "bg-slate-900",

    heroText:
      "bg-slate-200",

    button:
      "bg-slate-900",

    buttonSecondary:
      "bg-slate-100",

    card:
      "border-slate-200 bg-white",

    cardMuted:
      "bg-slate-100",

    info:
      "border-slate-200 bg-white",

    infoTitle:
      "text-slate-900",

    infoText:
      "text-slate-500",
  },

  minimal: {
    section:
      "rounded-3xl border border-stone-200 bg-stone-50",

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

    logo:
      "bg-stone-900",

    nav:
      "bg-stone-100",

    hero:
      "bg-stone-50",

    heroTitle:
      "bg-stone-900",

    heroText:
      "bg-stone-200",

    button:
      "bg-stone-900",

    buttonSecondary:
      "bg-stone-100",

    card:
      "border-stone-200 bg-white",

    cardMuted:
      "bg-stone-100",

    info:
      "border-stone-200 bg-white",

    infoTitle:
      "text-stone-900",

    infoText:
      "text-stone-500",
  },

  dark: {
    section:
      "rounded-3xl border border-white/10 bg-[#06070a] text-white shadow-2xl",

    stage:
      "bg-[radial-gradient(circle_at_top,#182033_0%,#06070a_60%)]",

    browser:
      "border-white/10 bg-[#0d0f14] shadow-2xl",

    browserBar:
      "border-white/10 bg-[#11131a]",

    browserAddress:
      "bg-white/5",

    content:
      "bg-[#0d0f14]",

    logo:
      "bg-white",

    nav:
      "bg-white/5",

    hero:
      "bg-[radial-gradient(circle_at_top,#172033_0%,#0d0f14_70%)]",

    heroTitle:
      "bg-white",

    heroText:
      "bg-white/10",

    button:
      "bg-white",

    buttonSecondary:
      "bg-white/5",

    card:
      "border-white/10 bg-white/[0.04]",

    cardMuted:
      "bg-white/5",

    info:
      "border-white/10 bg-white/[0.04] backdrop-blur-xl",

    infoTitle:
      "text-white",

    infoText:
      "text-white/50",
  },

  glass: {
    section:
      "rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl",

    stage:
      "bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(236,72,153,0.18),transparent_30%)]",

    browser:
      "border-white/20 bg-white/20 shadow-2xl backdrop-blur-xl",

    browserBar:
      "border-white/20 bg-white/20",

    browserAddress:
      "bg-white/20",

    content:
      "bg-white/10",

    logo:
      "bg-slate-900",

    nav:
      "bg-white/20",

    hero:
      "bg-white/10",

    heroTitle:
      "bg-slate-900",

    heroText:
      "bg-slate-400/30",

    button:
      "bg-slate-900",

    buttonSecondary:
      "bg-white/20",

    card:
      "border-white/20 bg-white/20",

    cardMuted:
      "bg-white/20",

    info:
      "border-white/20 bg-white/20 backdrop-blur-xl",

    infoTitle:
      "text-slate-900",

    infoText:
      "text-slate-600",
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
        {/* Decorative Background */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-primary/10
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
            bg-indigo-500/10
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
            {/* Browser Controls */}

            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>

            {/* Address */}

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
              WEBSITE CONTENT
             ================================================= */}

          <div
            className={`
              ${styles.content}
              relative
            `}
          >
            {/* =================================================
                NAVIGATION
               ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between
                px-5
                py-5
                sm:px-8
              "
            >
              {/* Logo */}

              <div className="flex items-center gap-3">
                <div
                  className={`
                    ${styles.logo}
                    h-9
                    w-9
                    rounded-xl
                  `}
                />

                <div className="hidden space-y-1 sm:block">
                  <div
                    className={`
                      ${styles.nav}
                      h-3
                      w-24
                      rounded
                    `}
                  />

                  <div
                    className={`
                      ${styles.nav}
                      h-2
                      w-16
                      rounded
                    `}
                  />
                </div>
              </div>

              {/* Desktop Navigation */}

              <div
                className="
                  hidden
                  items-center
                  gap-4
                  md:flex
                "
              >
                <div
                  className={`${styles.nav} h-3 w-12 rounded`}
                />

                <div
                  className={`${styles.nav} h-3 w-14 rounded`}
                />

                <div
                  className={`${styles.nav} h-3 w-12 rounded`}
                />

                <div
                  className={`
                    ${styles.button}
                    h-8
                    w-20
                    rounded-lg
                  `}
                />
              </div>

              {/* Mobile Navigation */}

              <div
                className={`
                  ${styles.nav}
                  h-8
                  w-8
                  rounded-lg
                  md:hidden
                `}
              />
            </div>

            {/* =================================================
                HERO
               ================================================= */}

            <div
              className={`
                ${styles.hero}
                px-6
                py-14
                sm:px-10
                sm:py-20
              `}
            >
              <div className="mx-auto max-w-3xl text-center">
                {/* Badge */}

                <div
                  className={`
                    ${styles.nav}
                    mx-auto
                    mb-5
                    h-7
                    w-28
                    rounded-full
                  `}
                />

                {/* Title */}

                <div className="space-y-3">
                  <div
                    className={`
                      ${styles.heroTitle}
                      mx-auto
                      h-8
                      w-[85%]
                      max-w-2xl
                      rounded-lg
                    `}
                  />

                  <div
                    className={`
                      ${styles.heroTitle}
                      mx-auto
                      h-8
                      w-[60%]
                      max-w-xl
                      rounded-lg
                      opacity-80
                    `}
                  />
                </div>

                {/* Description */}

                <div
                  className="
                    mx-auto
                    mt-6
                    max-w-xl
                    space-y-2
                  "
                >
                  <div
                    className={`
                      ${styles.heroText}
                      mx-auto
                      h-3
                      w-full
                      rounded
                    `}
                  />

                  <div
                    className={`
                      ${styles.heroText}
                      mx-auto
                      h-3
                      w-[80%]
                      rounded
                    `}
                  />
                </div>

                {/* Buttons */}

                <div
                  className="
                    mt-8
                    flex
                    justify-center
                    gap-3
                  "
                >
                  <div
                    className={`
                      ${styles.button}
                      h-11
                      w-28
                      rounded-xl
                    `}
                  />

                  <div
                    className={`
                      ${styles.buttonSecondary}
                      h-11
                      w-28
                      rounded-xl
                    `}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                FEATURE CARDS
               ================================================= */}

            <div
              className="
                grid
                gap-4
                p-6
                sm:grid-cols-3
                sm:p-8
              "
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`
                    ${styles.card}
                    rounded-2xl
                    border
                    p-5
                    transition-all
                    duration-500
                  `}
                >
                  <div
                    className={`
                      ${styles.cardMuted}
                      mb-5
                      h-10
                      w-10
                      rounded-xl
                    `}
                  />

                  <div className="space-y-3">
                    <div
                      className={`
                        ${styles.nav}
                        h-4
                        w-28
                        rounded
                      `}
                    />

                    <div
                      className={`
                        ${styles.nav}
                        h-3
                        w-full
                        rounded
                      `}
                    />

                    <div
                      className={`
                        ${styles.nav}
                        h-3
                        w-4/5
                        rounded
                      `}
                    />
                  </div>
                </div>
              ))}
            </div>
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
            <div className="space-y-2">
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
                      bg-primary/10
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-primary
                    "
                  >
                    {template.category}
                  </span>
                )}

                <span
                  className="
                    rounded-full
                    bg-muted
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-muted-foreground
                  "
                >
                  Live Preview
                </span>
              </div>

              <h2
                className={`
                  ${styles.infoTitle}
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