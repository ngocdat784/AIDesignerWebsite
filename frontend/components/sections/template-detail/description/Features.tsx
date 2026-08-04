import Section from "./Section";

export default function Features() {
  const features = [
    "Responsive Layout",
    "Dark Mode",
    "SEO Optimized",
    "TypeScript",
    "App Router",
    "Tailwind CSS",
  ];

  return (
    <Section title="Features">
      <ul className="grid gap-3 md:grid-cols-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="rounded-xl border p-3"
          >
            {feature}
          </li>
        ))}
      </ul>
    </Section>
  );
}