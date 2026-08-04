import Section from "./Section";

export default function Requirements() {
  return (
    <Section title="Requirements">
      <ul className="space-y-2 text-muted-foreground">
        <li>Node.js 20+</li>

        <li>Next.js 15</li>

        <li>React 19</li>

        <li>Tailwind CSS 4</li>
      </ul>
    </Section>
  );
}