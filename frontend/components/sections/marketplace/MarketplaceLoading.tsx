export default function MarketplaceLoading() {
  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="
            overflow-hidden
            rounded-3xl
            border
            bg-card
          "
        >
          {/* Thumbnail */}

          <div
            className="
              aspect-[16/10]
              animate-pulse
              bg-muted
            "
          />

          {/* Content */}

          <div className="space-y-5 p-6">
            {/* Title */}

            <div className="space-y-3">
              <div
                className="
                  h-6
                  w-2/3
                  animate-pulse
                  rounded
                  bg-muted
                "
              />

              <div
                className="
                  h-4
                  w-full
                  animate-pulse
                  rounded
                  bg-muted
                "
              />

              <div
                className="
                  h-4
                  w-5/6
                  animate-pulse
                  rounded
                  bg-muted
                "
              />
            </div>

            {/* Rating */}

            <div
              className="
                h-4
                w-1/2
                animate-pulse
                rounded
                bg-muted
              "
            />

            {/* Author */}

            <div
              className="
                flex
                items-center
                justify-between
                border-t
                pt-5
              "
            >
              <div className="space-y-2">
                <div
                  className="
                    h-4
                    w-24
                    animate-pulse
                    rounded
                    bg-muted
                  "
                />

                <div
                  className="
                    h-3
                    w-16
                    animate-pulse
                    rounded
                    bg-muted
                  "
                />
              </div>

              <div
                className="
                  h-8
                  w-20
                  animate-pulse
                  rounded-full
                  bg-muted
                "
              />
            </div>

            {/* Actions */}

            <div className="flex gap-3">
              <div
                className="
                  h-10
                  flex-1
                  animate-pulse
                  rounded-xl
                  bg-muted
                "
              />

              <div
                className="
                  h-10
                  w-10
                  animate-pulse
                  rounded-xl
                  bg-muted
                "
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}