import Header from "@/components/portfolio/header";
import Hero from "@/components/portfolio/hero";
import Cases from "@/components/portfolio/cases";
import OwnProjects from "@/components/portfolio/own-projects";
import About from "@/components/portfolio/about";
import Tech from "@/components/portfolio/tech";
import Prices from "@/components/portfolio/prices";
import Contact from "@/components/portfolio/contact";
import Footer from "@/components/portfolio/footer";
import ScrollReveal from "@/components/portfolio/scroll-reveal";
import ScrollFx from "@/components/portfolio/scroll-fx";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0b] text-zinc-50">
      <ScrollReveal />
      <ScrollFx />
      <Header />
      <main className="flex-1">
        <Hero />
        <Cases />
        <OwnProjects />
        <About />
        <Tech />
        <Prices />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
