"use client";

import { AiSaasTheme } from "./AiSaasTheme";

const reviews = [
  {
    name: "Alex Morgan",
    role: "Founder",
    text: "AI Designer completely changed how quickly we can launch new products.",
  },
  {
    name: "Sarah Chen",
    role: "Product Designer",
    text: "The AI workflow saves our team hours every single week.",
  },
  {
    name: "Daniel Kim",
    role: "Developer",
    text: "It gives us a strong starting point without sacrificing customization.",
  },
];

export default function AiSaasReviews() {
  return (
    <section
      id="reviews"
      style={{
        background: AiSaasTheme.colors.background,
        padding: "96px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
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
            Customer Stories
          </p>

          <h2
            className={AiSaasTheme.sections.title}
            style={{
              color: AiSaasTheme.colors.text,
            }}
          >
            Loved by creators
          </h2>

          <p
            className={AiSaasTheme.sections.description}
            style={{
              color: AiSaasTheme.colors.textSecondary,
            }}
          >
            See how creators, designers, and teams are using AI Designer
            to build better products faster.
          </p>
        </div>

        {/* Reviews */}
        <div
          style={{
            marginTop: "64px",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "24px",
          }}
        >
          {reviews.map((review) => (
            <article
              key={review.name}
              className={`${AiSaasTheme.cards.base} ${AiSaasTheme.cards.hover}`}
              style={{
                borderColor: AiSaasTheme.colors.border,
                background: AiSaasTheme.colors.background,
              }}
            >
              {/* Stars */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  color: AiSaasTheme.colors.warning,
                  fontSize: "18px",
                  letterSpacing: "2px",
                }}
              >
                {"★★★★★"}
              </div>

              {/* Review */}
              <p
                style={{
                  marginTop: "24px",
                  color: AiSaasTheme.colors.textSecondary,
                  fontSize: "16px",
                  lineHeight: "1.75",
                }}
              >
                "{review.text}"
              </p>

              {/* User */}
              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "20px",
                  borderTop: `1px solid ${AiSaasTheme.colors.borderSoft}`,
                }}
              >
                <div
                  style={{
                    color: AiSaasTheme.colors.text,
                    fontSize: "16px",
                    fontWeight: 800,
                  }}
                >
                  {review.name}
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    color: AiSaasTheme.colors.textMuted,
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {review.role}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 900px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-top: 72px !important;
            padding-bottom: 72px !important;
          }
        }
      `}</style>
    </section>
  );
}