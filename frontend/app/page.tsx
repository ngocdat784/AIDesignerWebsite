import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Features />
      </main>

      <Footer />
    </>
  );
}