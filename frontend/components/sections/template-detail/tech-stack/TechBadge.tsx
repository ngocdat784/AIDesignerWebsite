import TechIcon from "./TechIcon";

interface Props {
  tech: string;
}

export default function TechBadge({
  tech,
}: Props) {
  return (
    <div
      className="
        group
        inline-flex
        items-center
        gap-3
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-2.5
        text-sm
        font-medium
        text-slate-700
        shadow-sm
        transition-all
        duration-300
        ease-out
        hover:-translate-y-0.5
        hover:border-primary/30
        hover:bg-primary/[0.03]
        hover:shadow-md
      "
    >
      {/* Technology icon */}

      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-slate-200
          bg-slate-50
          transition-all
          duration-300
          group-hover:border-primary/20
          group-hover:bg-primary/10
        "
      >
        <TechIcon name={tech} />
      </div>

      {/* Technology name */}

      <span
        className="
          whitespace-nowrap
          transition-colors
          duration-300
          group-hover:text-slate-900
        "
      >
        {tech}
      </span>
    </div>
  );
}