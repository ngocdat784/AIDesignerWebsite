import Section from "./Section";

export default function Changelog() {
  return (
    <Section title="Version History">
      <div className="space-y-4">
        <div>
          <div className="font-medium">
            v2.3.1
          </div>

          <div className="text-sm text-muted-foreground">
            Added AI Builder support.
          </div>
        </div>

        <div>
          <div className="font-medium">
            v2.2.0
          </div>

          <div className="text-sm text-muted-foreground">
            Improved responsive layout.
          </div>
        </div>
      </div>
    </Section>
  );
}