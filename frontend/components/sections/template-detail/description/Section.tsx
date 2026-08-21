
interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  title,
  children,
  className = "",
}: Props) {
  return (
    <section
      className={`
        space-y-5
        rounded-2xl
        border
        border-border/60
        bg-card
        p-6
        shadow-sm
        transition-all
        duration-300
        ${className}
      `}
    >
      <h2
        className="
          text-2xl
          font-semibold
          tracking-tight
          text-foreground
        "
      >
        {title}
      </h2>

      <div className="text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

