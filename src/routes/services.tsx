import { createFileRoute, Link } from "@tanstack/react-router";
import { useCMS } from "@/context/CMSContext";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/sections/CTABanner";
import { Process } from "@/components/sections/Process";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Motion In Tech" },
      { name: "description", content: "Web, mobile, design, ERP and IT consulting — five disciplines, one studio engineered to ship iconic digital products." },
      { property: "og:title", content: "Services — Motion In Tech" },
      { property: "og:description", content: "Five disciplines. One studio. Engineered to ship." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { data } = useCMS();
  const services = data.services.filter((s) => s.visible);
  return (
    <main>
      <PageHero
        eyebrow="01 — Capabilities"
        title="What we"
        accent="do."
        subtitle="Five disciplines. One studio. Click any practice area to explore our capabilities and architecture stack."
      />

      <section className="relative bg-background pb-32">
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((s, i) => {
              const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>>)[s.icon] || Icons.Sparkles;
              return (
                <Link
                  key={s.id}
                  to="/services_/$serviceId"
                  params={{ serviceId: s.id }}
                  data-cursor="explore"
                  className="group relative flex flex-col justify-between overflow-hidden border border-border bg-elevated p-8 transition-all hover:border-neon/50 hover:-translate-y-1 md:p-12 block"
                  style={{ background: "var(--color-elevated)" }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(600px circle at 50% 0%, color-mix(in oklab, var(--color-neon) 14%, transparent), transparent 70%)" }}
                  />
                  <div className="relative flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center border border-border bg-background transition-colors group-hover:border-neon group-hover:text-neon">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-muted-foreground flex items-center gap-2">
                      0{i + 1}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:text-neon transition-opacity" />
                    </span>
                  </div>
                  <div className="relative mt-12">
                    <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl group-hover:text-neon transition-colors">{s.title}</h2>
                    <p className="mt-4 max-w-md text-muted-foreground">{s.description}</p>
                    <ul className="mt-8 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                      {s.subServices.map((ss) => (
                        <li
                          key={ss}
                          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-foreground/80"
                        >
                          <span className="h-1 w-1 rounded-full bg-neon" style={{ background: "var(--color-neon)" }} />
                          {ss}
                        </li>
                      ))}
                    </ul>
                    {s.technologies?.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-2">
                        {s.technologies.map((t) => (
                          <span
                            key={t}
                            className="border border-border bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon" style={{ color: "var(--color-neon)" }}>
                      Explore Practice <ArrowUpRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Process />
      <CTABanner />
    </main>
  );
}
