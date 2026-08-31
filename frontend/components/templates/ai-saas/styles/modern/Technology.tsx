"use client";

import { AiSaasTheme } from "../../AiSaasTheme";

export default function AiSaasTechnology() {
  return (
    <section
      style={{
        background: AiSaasTheme.colors.background,
        padding: "96px 24px",
      }}
    >
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "1200px",
        }}
      >
        <div
          className="relative overflow-hidden text-center text-white"
          style={{
            borderRadius: AiSaasTheme.radius.largeCard,
            background: AiSaasTheme.gradients.darkPreview,
            padding: "64px 32px",
            boxShadow: AiSaasTheme.shadows.preview,
          }}
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: AiSaasTheme.gradients.sectionGlow,
              opacity: 0.8,
            }}
          />

          <div className="relative z-10">
            <p
              style={{
                color: AiSaasTheme.colors.secondary,
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Built for the Future
            </p>

            <h2
              style={{
                marginTop: "16px",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 900,
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
              }}
            >
              Powered by modern AI technology
            </h2>

            <p
              style={{
                maxWidth: "680px",
                margin: "20px auto 0",
                color: "#94a3b8",
                fontSize: "18px",
                lineHeight: 1.75,
              }}
            >
              AI Designer combines intelligent models,
              automation and modern cloud infrastructure
              to deliver a fast and reliable experience.
            </p>

            <div
              className="grid md:grid-cols-4"
              style={{
                marginTop: "48px",
                gap: "16px",
              }}
            >
              {[
                "AI Models",
                "Cloud Infrastructure",
                "Real-time Data",
                "Secure API",
              ].map((item) => (
                <div
                  key={item}
                  className="transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderRadius: AiSaasTheme.radius.card,
                    border: `1px solid ${AiSaasTheme.colors.previewBorder}`,
                    background: AiSaasTheme.colors.previewSurface,
                    padding: "20px",
                    color: AiSaasTheme.colors.textWhite,
                    fontSize: "14px",
                    fontWeight: 700,
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}