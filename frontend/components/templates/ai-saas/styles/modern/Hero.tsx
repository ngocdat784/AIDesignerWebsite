"use client";

import { AiSaasTheme } from "./AiSaasTheme";

export default function AiSaasHero() {
  return (
    <section className={AiSaasTheme.hero.section}>
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: AiSaasTheme.gradients.heroGlow,
        }}
      />

      <div className={AiSaasTheme.hero.content}>
        {/* Badge */}
        <div className={AiSaasTheme.hero.badge}>
          <span>✦</span>
          <span>AI Powered Website Builder</span>
        </div>

        {/* Heading */}
        <h1 className={AiSaasTheme.hero.title}>
          Build smarter.
          <br />

          <span className={AiSaasTheme.hero.gradientTitle}>
            Design faster with AI.
          </span>
        </h1>

        {/* Description */}
        <p className={AiSaasTheme.hero.description}>
          Create beautiful websites, automate your workflow,
          and turn your ideas into production-ready digital
          experiences with AI Designer.
        </p>

        {/* Actions */}
        <div className={AiSaasTheme.hero.actions}>
          <button className={AiSaasTheme.buttons.primary.className}>
            Start Building →
          </button>

          <button className={AiSaasTheme.buttons.secondary.className}>
            Explore Templates
          </button>
        </div>

        {/* Stats */}
        <div className={AiSaasTheme.hero.stats}>
          <div className="text-center">
            <div className={AiSaasTheme.hero.statValue}>
              20K+
            </div>

            <div className={AiSaasTheme.hero.statLabel}>
              Templates
            </div>
          </div>

          <div className="text-center">
            <div className={AiSaasTheme.hero.statValue}>
              150K+
            </div>

            <div className={AiSaasTheme.hero.statLabel}>
              Creators
            </div>
          </div>

          <div className="text-center">
            <div className={AiSaasTheme.hero.statValue}>
              99.9%
            </div>

            <div className={AiSaasTheme.hero.statLabel}>
              Uptime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}