import Section from "@/components/ui/section";
import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

import MarketplaceHeader from "./MarketplaceHeader";
import TemplateGrid from "./TemplateGrid";

export default function Marketplace() {
  return (
    <Section>

      <Container>

        <MarketplaceHeader />

        <SectionTitle
          title="Featured Templates"
          subtitle="Discover premium templates crafted by professional creators."
        />

        <TemplateGrid />

      </Container>

    </Section>
  );
}