export default function MarketplaceGradient() {
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
      {/* Top Fade */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-40
          bg-gradient-to-b
          from-background
          via-background/80
          to-transparent
        "
      />

      {/* Bottom Fade */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-48
          bg-gradient-to-t
          from-background
          via-background/80
          to-transparent
        "
      />

      {/* Left Glow */}

      <div
        className="
          absolute
          left-0
          top-1/2
          h-[500px]
          w-[260px]
          -translate-y-1/2
          bg-gradient-to-r
          from-primary/10
          via-primary/5
          to-transparent
        "
      />

      {/* Right Glow */}

      <div
        className="
          absolute
          right-0
          top-1/2
          h-[500px]
          w-[260px]
          -translate-y-1/2
          bg-gradient-to-l
          from-violet-500/10
          via-violet-500/5
          to-transparent
        "
      />

      {/* Center Highlight */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-radial
          from-primary/5
          via-transparent
          to-transparent
        "
      />
    </div>
  );
}