import HeroBadge from "./HeroBadge";
import HeroContent from "./HeroContent";
import HeroActions from "./HeroActions";
import HeroPreview from "./HeroPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">

        <HeroBadge />

        <HeroContent />

        <HeroActions />

        <HeroPreview />

      </div>
    </section>
  );
}