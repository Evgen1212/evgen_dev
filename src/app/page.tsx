import Header from "@/components/portfolio/header";
import Hero from "@/components/portfolio/hero";
import Cases from "@/components/portfolio/cases";
import OwnProjects from "@/components/portfolio/own-projects";
import About from "@/components/portfolio/about";
import Tech from "@/components/portfolio/tech";
import Process from "@/components/portfolio/process";
import Prices from "@/components/portfolio/prices";
import Faq from "@/components/portfolio/faq";
import Testimonials from "@/components/portfolio/testimonials";
import Contact from "@/components/portfolio/contact";
import Footer from "@/components/portfolio/footer";
import ScrollReveal from "@/components/portfolio/scroll-reveal";
import ScrollFx from "@/components/portfolio/scroll-fx";
import ScrollWidgets from "@/components/portfolio/scroll-widgets";
import IntroLoader from "@/components/portfolio/intro-loader";
import { socials, prices } from "@/components/portfolio/data";

const priceValues: Record<string, number> = {
  Лендинг: 30000,
  "Многостраничный сайт": 60000,
  "Веб-сервис": 120000,
  "Боты и автоматизация": 25000,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Erriour",
  url: "https://erriour.ru",
  image: "https://erriour.ru/images/og.png",
  description:
    "Веб-разработка любой сложности: сайты, веб-сервисы, боты, логотипы, системное администрирование. Полный цикл — от идеи до запуска.",
  priceRange: "от 25 000 RUB",
  areaServed: "RU",
  founder: {
    "@type": "Person",
    name: "Владимир",
    jobTitle: "Веб-разработчик",
    alumniOf: { "@type": "CollegeOrUniversity", name: "Университет ИТМО" },
  },
  sameAs: socials.map((s) => s.href),
  makesOffer: prices.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.description,
    price: priceValues[p.name],
    priceCurrency: "RUB",
  })),
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0b] text-zinc-50">
      <IntroLoader />
      <ScrollReveal />
      <ScrollFx />
      <ScrollWidgets />
      {/* плёночное зерно поверх всего интерфейса */}
      <div aria-hidden="true" className="noise-overlay" />
      <Header />
      <main className="flex-1">
        <Hero />
        <Cases />
        <OwnProjects />
        <About />
        <Tech />
        <Process />
        <Prices />
        <Faq />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
