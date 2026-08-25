"use client";

import { AiSaasTheme } from "./AiSaasTheme";

export default function AiSaasNavbar() {
  return (
    <header
      className={AiSaasTheme.navbar.wrapper}
      style={{
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        className={AiSaasTheme.navbar.inner}
        style={{
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3"
        >
          <div
            className={AiSaasTheme.icon.wrapperGradient}
            style={{
              borderRadius: "12px",
              background: AiSaasTheme.gradients.primary,
            }}
          >
            <span className="text-xl">
              ✦
            </span>
          </div>

          <div>
            <div className={AiSaasTheme.navbar.logo}>
              AI Designer
            </div>

            <div className={AiSaasTheme.navbar.subtitle}>
              Premium AI SaaS Platform
            </div>
          </div>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className={AiSaasTheme.navbar.link}
          >
            Features
          </a>

          <a
            href="#workflow"
            className={AiSaasTheme.navbar.link}
          >
            Workflow
          </a>

          <a
            href="#pricing"
            className={AiSaasTheme.navbar.link}
          >
            Pricing
          </a>

          <a
            href="#reviews"
            className={AiSaasTheme.navbar.link}
          >
            Reviews
          </a>
        </nav>

        {/* CTA */}
        <button
          className={AiSaasTheme.buttons.primary.className}
          style={{
            ...AiSaasTheme.buttons.primary.style,
            borderRadius: "12px",
          }}
        >
          Get Started
        </button>
      </div>
    </header>
  );
}