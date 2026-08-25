"use client";

import AiSaasNavbar from "./AiSaasNavbar";
import AiSaasHero from "./AiSaasHero";
import AiSaasProductPreview from "./AiSaasProductPreview";
import AiSaasTrustedBy from "./AiSaasTrustedBy";
import AiSaasFeatures from "./AiSaasFeatures";
import AiSaasWorkflow from "./AiSaasWorkflow";
import AiSaasTechnology from "./AiSaasTechnology";
import AiSaasPricing from "./AiSaasPricing";
import AiSaasReviews from "./AiSaasReviews";
import AiSaasCTA from "./AiSaasCTA";
import AiSaasFooter from "./AiSaasFooter";

export default function AiSaasLandingPage() {
  return (
    <main
      className="min-h-screen bg-white text-slate-950"
      style={{
        margin: "0 auto",
        padding: "0 24px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <AiSaasNavbar />

      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <AiSaasHero />

        <AiSaasProductPreview />

        <AiSaasTrustedBy />

        <AiSaasFeatures />

        <AiSaasWorkflow />

        <AiSaasTechnology />

        <AiSaasPricing />

        <AiSaasReviews />

        <AiSaasCTA />
      </div>

      <AiSaasFooter />
    </main>
  );
}