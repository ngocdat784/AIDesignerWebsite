interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  number?: string;
}

export default function Section({
  title,
  children,
  className = "",
  number,
}: Props) {
  return (
    <section
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:border-slate-300
        hover:shadow-md
        ${className}
      `}
    >
      {/* Decorative accent */}
      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          bg-gradient-to-r
          from-primary
          via-indigo-500
          to-blue-500
          opacity-80
        "
      />

      <div
        className="
          space-y-6
          p-6
          sm:p-8
          lg:p-10
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-start
            gap-4
          "
        >
          {/* Number */}
          {number && (
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-primary/10
                text-sm
                font-bold
                text-primary
              "
            >
              {number}
            </div>
          )}

          {/* Title */}
          <div className="min-w-0">
            <h2
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                sm:text-3xl
              "
            >
              {title}
            </h2>

            <div
              className="
                mt-3
                h-1
                w-12
                rounded-full
                bg-primary
                transition-all
                duration-300
                group-hover:w-20
              "
            />
          </div>
        </div>

        {/* Content */}
        <div
          className="
            text-slate-600
            leading-7
          "
        >
          {children}
        </div>
      </div>
    </section>
  );
}