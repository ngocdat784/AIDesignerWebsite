export default function HeroPreview() {
  return (
    <div className="mt-16 w-full max-w-5xl rounded-3xl border bg-card p-8 shadow-xl">
      <div className="rounded-2xl border bg-background p-6">
        <div className="mb-4 h-4 w-40 rounded bg-muted" />

        <div className="space-y-3">
          <div className="h-4 rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
          <div className="h-4 w-3/5 rounded bg-muted" />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="h-40 rounded-xl bg-muted" />
          <div className="h-40 rounded-xl bg-muted" />
          <div className="h-40 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}