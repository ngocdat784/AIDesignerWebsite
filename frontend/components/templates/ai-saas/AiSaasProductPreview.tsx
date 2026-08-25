"use client";

import { AiSaasTheme } from "./AiSaasTheme";

export default function AiSaasProductPreview() {
  return (
    <section
      className={AiSaasTheme.preview.section}
      style={{
        background: AiSaasTheme.colors.background,
      }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className={AiSaasTheme.preview.eyebrow}>
            Powerful AI Workspace
          </p>

          <h2 className={AiSaasTheme.preview.title}>
            One platform for everything
          </h2>

          <p className={AiSaasTheme.preview.description}>
            Build, automate and manage your AI-powered workflow
            from a single workspace.
          </p>
        </div>

        {/* Product Window */}
        <div
          className={AiSaasTheme.preview.window}
          style={{
            background: AiSaasTheme.colors.previewBackground,
            borderColor: AiSaasTheme.colors.previewBorder,
            boxShadow:
              "0 35px 90px -35px rgba(15,23,42,0.65)",
          }}
        >
          {/* Browser Top Bar */}
          <div
            className={AiSaasTheme.preview.topBar}
            style={{
              background: AiSaasTheme.colors.previewBackground,
              borderColor: AiSaasTheme.colors.previewBorder,
            }}
          >
            <span
              className={AiSaasTheme.preview.dot}
              style={{ background: "#ef4444" }}
            />

            <span
              className={AiSaasTheme.preview.dot}
              style={{ background: "#f59e0b" }}
            />

            <span
              className={AiSaasTheme.preview.dot}
              style={{ background: "#22c55e" }}
            />
          </div>

          {/* Dashboard */}
          <div className="grid min-h-[420px] md:grid-cols-[220px_1fr]">
            {/* Sidebar */}
            <aside
              className="border-r p-5"
              style={{
                background: AiSaasTheme.colors.previewBackground,
                borderColor: AiSaasTheme.colors.previewBorder,
                color: AiSaasTheme.colors.textMuted,
              }}
            >
              <div className="mb-6 font-semibold text-white">
                AI Designer
              </div>

              <div className="space-y-3 text-sm">
                <div
                  className="rounded-lg px-3 py-2"
                  style={{
                    background:
                      "rgba(79, 70, 229, 0.20)",
                    color: AiSaasTheme.colors.secondary,
                  }}
                >
                  Dashboard
                </div>

                <div className="px-3 py-2">
                  AI Builder
                </div>

                <div className="px-3 py-2">
                  Projects
                </div>

                <div className="px-3 py-2">
                  Analytics
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div
              className="min-w-0 p-8"
              style={{
                background: AiSaasTheme.colors.previewSurface,
              }}
            >
              <div className="text-xl font-bold text-white">
                Welcome back
              </div>

              {/* Metrics */}
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <div
                  className={AiSaasTheme.preview.metricCard}
                  style={{
                    background:
                      AiSaasTheme.colors.previewSurfaceSoft,
                    borderColor:
                      AiSaasTheme.colors.previewBorder,
                  }}
                >
                  <div
                    className={AiSaasTheme.preview.metricLabel}
                  >
                    Projects
                  </div>

                  <div
                    className={AiSaasTheme.preview.metricValue}
                  >
                    128
                  </div>
                </div>

                <div
                  className={AiSaasTheme.preview.metricCard}
                  style={{
                    background:
                      AiSaasTheme.colors.previewSurfaceSoft,
                    borderColor:
                      AiSaasTheme.colors.previewBorder,
                  }}
                >
                  <div
                    className={AiSaasTheme.preview.metricLabel}
                  >
                    AI Generations
                  </div>

                  <div
                    className={AiSaasTheme.preview.metricValue}
                  >
                    8.4K
                  </div>
                </div>

                <div
                  className={AiSaasTheme.preview.metricCard}
                  style={{
                    background:
                      AiSaasTheme.colors.previewSurfaceSoft,
                    borderColor:
                      AiSaasTheme.colors.previewBorder,
                  }}
                >
                  <div
                    className={AiSaasTheme.preview.metricLabel}
                  >
                    Performance
                  </div>

                  <div
                    className="mt-2 text-3xl font-black"
                    style={{
                      color: AiSaasTheme.colors.secondary,
                    }}
                  >
                    98.6%
                  </div>
                </div>
              </div>

              {/* Analytics Preview */}
              <div
                className="mt-6 h-40 rounded-2xl"
                style={{
                  background:
                    AiSaasTheme.gradients.purplePanel,
                  opacity: 0.75,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}