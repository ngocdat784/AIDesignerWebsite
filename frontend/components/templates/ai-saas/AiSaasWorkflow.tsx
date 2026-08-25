"use client";

import { AiSaasTheme } from "./AiSaasTheme";

const steps = [
  {
    number: "01",
    title: "Describe your idea",
    description:
      "Tell AI Designer what you want to build.",
  },
  {
    number: "02",
    title: "Let AI build",
    description:
      "Our AI transforms your idea into a complete experience.",
  },
  {
    number: "03",
    title: "Customize",
    description:
      "Fine-tune the generated result to match your brand.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Publish your finished product and start growing.",
  },
];

export default function AiSaasWorkflow() {
  return (
    <section
      id="workflow"
      style={{
        background: AiSaasTheme.colors.backgroundSoft,
        padding: "96px 24px",
      }}
    >
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "1400px",
        }}
      >
        {/* Heading */}
        <div
          style={{
            maxWidth: "768px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            className={AiSaasTheme.sections.eyebrow}
            style={{
              color: AiSaasTheme.colors.primary,
            }}
          >
            Simple Workflow
          </p>

          <h2
            className={AiSaasTheme.sections.title}
            style={{
              color: AiSaasTheme.colors.text,
            }}
          >
            From idea to launch
          </h2>

          <p
            className={AiSaasTheme.sections.description}
            style={{
              color: AiSaasTheme.colors.textSecondary,
            }}
          >
            A simple AI-powered workflow that helps you turn
            an idea into a production-ready experience.
          </p>
        </div>

        {/* Steps */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4"
          style={{
            marginTop: "64px",
            gap: "24px",
          }}
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              style={{
                position: "relative",
                padding: "8px",
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontSize: "56px",
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: AiSaasTheme.colors.borderSoft,
                }}
              >
                {step.number}
              </div>

              {/* Accent Line */}
              <div
                style={{
                  width: "42px",
                  height: "4px",
                  marginTop: "18px",
                  borderRadius: "999px",
                  background: AiSaasTheme.gradients.primary,
                }}
              />

              {/* Title */}
              <h3
                className={AiSaasTheme.typography.cardTitle}
                style={{
                  marginTop: "20px",
                  color: AiSaasTheme.colors.text,
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  marginTop: "12px",
                  color: AiSaasTheme.colors.textSecondary,
                  fontSize: "16px",
                  lineHeight: 1.75,
                }}
              >
                {step.description}
              </p>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block"
                  style={{
                    position: "absolute",
                    top: "32px",
                    right: "-12px",
                    width: "24px",
                    height: "1px",
                    background: AiSaasTheme.colors.border,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}