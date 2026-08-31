"use client";

import { AiSaasTheme } from "../../AiSaasTheme";

export default function AiSaasTrustedBy() {
  return (
    <section
      style={{
        borderTop: `1px solid ${AiSaasTheme.colors.borderSoft}`,
        borderBottom: `1px solid ${AiSaasTheme.colors.borderSoft}`,
        background: AiSaasTheme.colors.backgroundSoft,
        padding: "64px 24px",
      }}
    >
      <div
        className="mx-auto w-full text-center"
        style={{
          maxWidth: "1200px",
        }}
      >
        {/* Label */}
        <p
          className={AiSaasTheme.trustedBy.label}
          style={{
            color: AiSaasTheme.colors.textMuted,
          }}
        >
          Trusted by creators and companies worldwide
        </p>

        {/* Companies */}
        <div
          className="flex flex-wrap items-center justify-center"
          style={{
            marginTop: "32px",
            columnGap: "48px",
            rowGap: "20px",
          }}
        >
          {[
            "Google",
            "Microsoft",
            "OpenAI",
            "Vercel",
            "Adobe",
          ].map((company) => (
            <span
              key={company}
              style={{
                color: AiSaasTheme.colors.textMuted,
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                opacity: 0.55,
                transition: "all 0.3s ease",
              }}
              className="hover:opacity-100"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}