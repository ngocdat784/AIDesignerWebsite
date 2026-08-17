
import { CalendarDays, GitCommit } from "lucide-react";

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
    <section className="space-y-5">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Changelog
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Latest updates, improvements, and changes to this
          template.
        </p>
      </div>

      {/* Changelog */}

      <div className="space-y-4">
        {changelog.map(
          (release, index) => (
            <div
              key={`${release.version}-${release.date}-${index}`}
              className="
                relative
                rounded-2xl
                border
                bg-card
                p-5
                transition-all
                duration-200
                hover:border-primary/30
              "
            >
              {/* Version header */}

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
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary/10
                      text-primary
                    "
                  >
                    <GitCommit className="h-4 w-4" />
                  </div>

                  <div>
                    <h3
                      className="
                        text-base
                        font-semibold
                      "
                    >
                      Version {release.version}
                    </h3>

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        text-muted-foreground
                      "
                    >
                      <CalendarDays className="h-3.5 w-3.5" />

                      <span>
                        {release.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Changes */}

              {release.changes?.length > 0 && (
                <div className="mt-5">
                  <ul className="space-y-2.5">
                    {release.changes.map(
                      (change, changeIndex) => (
                        <li
                          key={`${change}-${changeIndex}`}
                          className="
                            flex
                            items-start
                            gap-3
                            text-sm
                            leading-6
                            text-muted-foreground
                          "
                        >
                          <span
                            className="
                              mt-2
                              h-1.5
                              w-1.5
                              shrink-0
                              rounded-full
                              bg-primary
                            "
                          />

                          <span>
                            {change}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>
          ),
        )}
      </div>
    </section>
  );
}

