interface Props {
  title: string;
  subtitle: string;
}

export default function SectionHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-14 text-center">

      <h2 className="text-4xl font-bold">
        {title}
      </h2>

      <p className="mt-4 text-muted-foreground">
        {subtitle}
      </p>

    </div>
  );
}