export default function MarketplaceBackground() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* Top Left */}

      <div
        className="
          absolute
          left-[-8rem]
          top-[-6rem]
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-primary/10
          blur-3xl
        "
      />

      {/* Top Right */}

      <div
        className="
          absolute
          right-[-10rem]
          top-20
          h-[24rem]
          w-[24rem]
          rounded-full
          bg-sky-500/10
          blur-3xl
        "
      />

      {/* Bottom Center */}

      <div
        className="
          absolute
          bottom-[-10rem]
          left-1/2
          h-[34rem]
          w-[34rem]
          -translate-x-1/2
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)]
          bg-[size:64px_64px]
          [mask-image:radial-gradient(circle_at_center,black,transparent_90%)]
        "
      />
    </div>
  );
}