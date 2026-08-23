import {
  CalendarDays,
  GitCommit,
  Check,
} from "lucide-react";

import type { Template } from "@/types/template/template";

interface TemplateChangelogProps {
  template: Template;
}

export default function TemplateChangelog({
  template,
}: TemplateChangelogProps) {
  const changelog =
    template.changelog ?? [];

  if (changelog.length === 0) {
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
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Title */}

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
              <GitCommit className="h-5 w-5" />
            </div>

            <div>
              <h2
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-900
                "
              >
                Changelog
              </h2>

              <p
                className="
                  mt-1
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Latest updates, improvements, and
                changes to this template.
              </p>
            </div>
          </div>

          {/* Release count */}

          <div
            className="
              inline-flex
              w-fit
              items-center
              rounded-full
              bg-slate-100
              px-3
              py-1.5
              text-xs
              font-semibold
              text-slate-600
            "
          >
            {changelog.length}{" "}
            {changelog.length === 1
              ? "Release"
              : "Releases"}
          </div>
        </div>
      </div>

      {/* =====================================================
          RELEASE TIMELINE
         ===================================================== */}

      <div className="p-6 sm:p-8">
        <div className="relative space-y-6">
          {changelog.map(
            (release, index) => (
              <div
                key={`${release.version}-${release.date}-${index}`}
                className="
                  group
                  relative
                  flex
                  gap-4
                  sm:gap-6
                "
              >
                {/* =================================================
                    TIMELINE
                   ================================================= */}

                <div
                  className="
                    relative
                    flex
                    w-10
                    shrink-0
                    justify-center
                  "
                >
                  {/* Vertical line */}

                  {index <
                    changelog.length - 1 && (
                    <div
                      className="
                        absolute
                        left-1/2
                        top-10
                        h-[calc(100%+1.5rem)]
                        w-px
                        -translate-x-1/2
                        bg-slate-200
                      "
                    />
                  )}

                  {/* Release icon */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-primary/20
                      bg-primary/10
                      text-primary
                      transition-all
                      duration-200
                      group-hover:border-primary
                      group-hover:bg-primary
                      group-hover:text-primary-foreground
                    "
                  >
                    <GitCommit className="h-4 w-4" />
                  </div>
                </div>

                {/* =================================================
                    RELEASE CARD
                   ================================================= */}

                <div
                  className="
                    min-w-0
                    flex-1
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50/60
                    p-5
                    transition-all
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:border-primary/30
                    group-hover:bg-white
                    group-hover:shadow-sm
                  "
                >
                  {/* Release header */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div>
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >
                        <h3
                          className="
                            text-base
                            font-bold
                            text-slate-900
                          "
                        >
                          Version{" "}
                          {release.version}
                        </h3>

                        {index === 0 && (
                          <span
                            className="
                              rounded-full
                              bg-primary/10
                              px-2.5
                              py-1
                              text-[11px]
                              font-semibold
                              text-primary
                            "
                          >
                            Latest
                          </span>
                        )}
                      </div>

                      <div
                        className="
                          mt-1.5
                          flex
                          items-center
                          gap-1.5
                          text-xs
                          text-slate-500
                        "
                      >
                        <CalendarDays className="h-3.5 w-3.5" />

                        <span>
                          {release.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Changes */}

                  {release.changes?.length > 0 && (
                    <div
                      className="
                        mt-5
                        border-t
                        border-slate-200
                        pt-4
                      "
                    >
                      <ul className="space-y-3">
                        {release.changes.map(
                          (
                            change,
                            changeIndex,
                          ) => (
                            <li
                              key={`${change}-${changeIndex}`}
                              className="
                                flex
                                items-start
                                gap-3
                              "
                            >
                              <div
                                className="
                                  mt-0.5
                                  flex
                                  h-5
                                  w-5
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-green-50
                                  text-green-600
                                "
                              >
                                <Check className="h-3 w-3" />
                              </div>

                              <span
                                className="
                                  text-sm
                                  leading-6
                                  text-slate-600
                                "
                              >
                                {change}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}