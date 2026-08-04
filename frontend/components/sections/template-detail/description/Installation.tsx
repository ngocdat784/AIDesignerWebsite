import Section from "./Section";

export default function Installation() {
  return (
    <Section title="Installation">
      <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
        <li>Download the template.</li>

        <li>Install dependencies.</li>

        <li>Run npm install.</li>

        <li>Run npm run dev.</li>
      </ol>
    </Section>
  );
}