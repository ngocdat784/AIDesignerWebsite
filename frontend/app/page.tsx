import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Marketplace from "@/components/sections/marketplace";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />

        <Features />

        <Marketplace />
      </main>

      <Footer className="mt-24" />
    </>
  );
}