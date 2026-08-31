"use client";

import { AiSaasTheme } from "./AiSaasTheme";

export default function AiSaasFooter() {
  return (
    <footer
      className={AiSaasTheme.footer.wrapper}
      style={{
        background: AiSaasTheme.colors.background,
        borderColor: AiSaasTheme.colors.border,
      }}
    >
      <div
        className={AiSaasTheme.footer.inner}
        style={{
          margin: "0 auto",
        }}
      >
        {/* Brand */}
        <div>
          <div className={AiSaasTheme.footer.brand}>
            AI Designer
          </div>

          <p
            className={AiSaasTheme.footer.text}
            style={{
              marginTop: "8px",
            }}
          >
            Premium AI SaaS Platform
          </p>
        </div>

        {/* Links */}
        <div
          className="flex flex-wrap items-center gap-6 md:gap-8"
          style={{
            justifyContent: "center",
          }}
        >
          <a
            href="#features"
            className={AiSaasTheme.footer.link}
          >
            Features
          </a>

          <a
            href="#pricing"
            className={AiSaasTheme.footer.link}
          >
            Pricing
          </a>

          <a
            href="#reviews"
            className={AiSaasTheme.footer.link}
          >
            Reviews
          </a>

          <a
            href="#"
            className={AiSaasTheme.footer.link}
          >
            Terms
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="mx-auto w-full max-w-7xl border-t px-5 pt-6 sm:px-6 lg:px-8"
        style={{
          marginTop: "40px",
          paddingBottom: "0",
          borderColor: AiSaasTheme.colors.borderSoft,
        }}
      >
        <p
          className="text-sm"
          style={{
            color: AiSaasTheme.colors.textMuted,
            textAlign: "center",
          }}
        >
          © 2026 AI Designer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}