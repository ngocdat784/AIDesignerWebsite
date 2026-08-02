import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import SectionTitle from "@/components/ui/section-title";

import FeatureCard from "./FeatureCard";
import { FEATURES } from "./features.data";

export default function Features() {
  return (
    <Section>
      <Container>

        <SectionTitle
          title="Everything You Need"
          subtitle="Powerful AI tools to design, customize and deploy modern websites."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>

      </Container>
    </Section>
  );
}