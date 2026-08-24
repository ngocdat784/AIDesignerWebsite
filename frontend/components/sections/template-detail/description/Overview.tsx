import type { TemplateDetailProps } from "../types";
import Section from "./Section";

export default function Overview({
  template,
}: TemplateDetailProps) {
  return (
    <Section
      title="Overview"
      number="01"
    >
      <div className="mt-5 max-w-4xl">
        <p
          className="
            text-base
            leading-8
            text-slate-600
            sm:text-lg
            sm:leading-9
          "
        >
          {template.description}
        </p>
      </div>
    </Section>
  );
}