"use client";

import { AiSaasTheme } from "../../AiSaasTheme";

const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "For individuals getting started with AI.",
  },
  {
    name: "Professional",
    price: "$49",
    description: "For creators and growing teams.",
    popular: true,
  },
  {
    name: "Business",
    price: "$99",
    description: "For businesses that need scale.",
  },
];

export default function AiSaasPricing() {
  return (
    <section
      id="pricing"
      style={{
        background: AiSaasTheme.colors.backgroundSoft,
        padding: "96px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Heading */}
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p className={AiSaasTheme.sections.eyebrow}>
            Pricing
          </p>

          <h2 className={AiSaasTheme.sections.title}>
            Choose the right plan
          </h2>

          <p className={AiSaasTheme.sections.description}>
            Flexible plans designed for individuals, creators,
            and businesses building with AI.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            marginTop: "64px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.popular
                  ? AiSaasTheme.cards.pricingFeatured
                  : AiSaasTheme.cards.pricing
              }
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    borderRadius: "999px",
                    padding: "6px 10px",
                    background: "#eef2ff",
                    color: AiSaasTheme.colors.primary,
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              {/* Plan name */}
              <h3
                className={AiSaasTheme.typography.cardTitle}
                style={{
                  color: AiSaasTheme.colors.text,
                  paddingRight: plan.popular ? "110px" : "0",
                }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "48px",
                    lineHeight: "1",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: AiSaasTheme.colors.text,
                  }}
                >
                  {plan.price}
                </span>

                <span
                  style={{
                    fontSize: "14px",
                    color: AiSaasTheme.colors.textMuted,
                  }}
                >
                  /month
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  marginTop: "18px",
                  minHeight: "48px",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: AiSaasTheme.colors.textSecondary,
                }}
              >
                {plan.description}
              </p>

              {/* Button */}
              <button
                className={AiSaasTheme.buttons.primary.className}
                style={{
                  ...AiSaasTheme.buttons.primary.style,
                  width: "100%",
                  marginTop: "32px",
                  cursor: "pointer",
                }}
              >
                Get Started
              </button>

              {/* Features */}
              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "24px",
                  borderTop: `1px solid ${
                    plan.popular
                      ? AiSaasTheme.colors.borderSoft
                      : AiSaasTheme.colors.border
                  }`,
                }}
              >
                <p
                  style={{
                    marginBottom: "14px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: AiSaasTheme.colors.text,
                  }}
                >
                  What's included
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    "AI-powered tools",
                    "Unlimited projects",
                    "Modern templates",
                    "Priority support",
                  ].map((feature) => (
                    <div
                      key={feature}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "14px",
                        color: AiSaasTheme.colors.textSecondary,
                      }}
                    >
                      <span
                        style={{
                          width: "20px",
                          height: "20px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          background: "#eef2ff",
                          color: AiSaasTheme.colors.primary,
                          fontSize: "12px",
                          fontWeight: 800,
                        }}
                      >
                        ✓
                      </span>

                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}