"use client";

import { AiSaasTheme } from "../../AiSaasTheme";

export default function AiSaasCTA() {
  return (
    <section
      style={{
        width: "100%",
        margin: "0 auto",
        padding: "96px 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        className={AiSaasTheme.cta.section}
        style={{
          margin: "0 auto",
          width: "100%",
          maxWidth: "1152px",
          background: AiSaasTheme.gradients.darkPreview,
          borderRadius: "32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          className={AiSaasTheme.cta.glow}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <h2 className={AiSaasTheme.cta.title}>
            Ready to build with AI?
          </h2>

          <p
            className={AiSaasTheme.cta.description}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Turn your ideas into beautiful digital experiences
            faster than ever.
          </p>

          <button
            className={AiSaasTheme.buttons.secondary.className}
            style={{
              marginTop: "32px",
              background: AiSaasTheme.colors.textWhite,
              color: AiSaasTheme.colors.primary,
              borderRadius: AiSaasTheme.radius.button
                .replace("rounded-", "")
                ? undefined
                : undefined,
              boxShadow: AiSaasTheme.shadows.button,
              padding: "16px 32px",
            }}
          >
            Start Building →
          </button>
        </div>
      </div>
    </section>
  );
}