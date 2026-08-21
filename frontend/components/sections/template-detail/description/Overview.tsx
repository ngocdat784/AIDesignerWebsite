
import type { TemplateDetailProps } from "../types";
import Section from "./Section";

export default function Overview({
  template,
}: TemplateDetailProps) {
  return (
    <Section title="Overview">
      <div className="max-w-4xl">
        <p className="text-base leading-8 text-muted-foreground">
          {template.description}
        </p>
      </div>
    </Section>
  );
}
