import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABanner } from "@/components/sections/CTABanner";
import { AboutStrip } from "@/components/sections/AboutStrip";
import { Capabilities } from "@/components/sections/Capabilities";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Capabilities />
      <Portfolio />
      <Testimonials />
      <AboutStrip />
      <CTABanner />
    </main>
  );
}
