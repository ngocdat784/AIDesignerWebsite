interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Section({
  title,
  children,
}: Props) {
  return (
    <section className="space-y-4 rounded-2xl border bg-card p-6">
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      {children}
    </section>
  );
}