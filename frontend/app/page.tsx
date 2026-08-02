import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
      </main>

      <Footer />
    </>
  );
}