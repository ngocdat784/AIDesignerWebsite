import type { TemplateDetailProps } from "../types";
import Section from "./Section";

export default function Overview({
  template,
}: TemplateDetailProps) {
  return (
    <Section title="Overview">
      <p className="leading-8 text-muted-foreground">
        {template.description}
      </p>
    </Section>
  );
}