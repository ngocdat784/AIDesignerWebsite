"use client";

import { AiSaasTheme } from "../../AiSaasTheme";

const features = [
  {
    title: "AI Website Builder",
    description:
      "Generate modern website experiences using intelligent AI tools.",
  },
  {
    title: "Smart Automation",
    description:
      "Automate repetitive workflows and save valuable development time.",
  },
  {
    title: "AI Content",
    description:
      "Generate high-quality content tailored to your product and audience.",
  },
  {
    title: "Analytics",
    description:
      "Understand your product performance with intelligent analytics.",
  },
  {
    title: "Team Collaboration",
    description:
      "Work together with your team inside a unified workspace.",
  },
  {
    title: "Production Ready",
    description:
      "Turn generated ideas into polished production-ready experiences.",
  },
];

export default function AiSaasFeatures() {
  return (
    <section
      id="features"
      className={AiSaasTheme.sections.wrapper}
      style={{
        background: AiSaasTheme.colors.background,
      }}
    >
      <div className={AiSaasTheme.layout.centered}>
        {/* Section Heading */}
        <div className={AiSaasTheme.sections.heading}>
          <p className={AiSaasTheme.sections.eyebrow}>
            Powerful Features
          </p>

          <h2 className={AiSaasTheme.sections.title}>
            Everything you need to build faster
          </h2>

          <p className={AiSaasTheme.sections.description}>
            A complete AI-powered platform for modern creators
            and businesses.
          </p>
        </div>

        {/* Features Grid */}
        <div
          className={`mt-16 grid ${AiSaasTheme.spacing.cardGap} md:grid-cols-2 lg:grid-cols-3`}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`${AiSaasTheme.cards.base} ${AiSaasTheme.cards.hover}`}
              style={{
                borderColor: AiSaasTheme.colors.border,
                background: AiSaasTheme.colors.background,
              }}
            >
              {/* Icon */}
              <div className={AiSaasTheme.icon.wrapperGradient}>
                ✦
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold tracking-[-0.02em] text-slate-950">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-base leading-7 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}