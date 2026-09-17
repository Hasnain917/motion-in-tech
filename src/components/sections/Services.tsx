import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useCMS } from "@/context/CMSContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Icons from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const { data } = useCMS();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  const services = data.services.filter((s) => s.visible);

  useEffect(() => {
    if (!root.current || !track.current) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const trackEl = track.current!;
      const distance = trackEl.scrollWidth - window.innerWidth + 80;
      gsap.to(trackEl, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance + 200}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [services.length]);

  return (
    <section id="services" ref={root} className="relative overflow-hidden bg-background py-[80px] md:py-32">
      <div className="mx-auto mb-10 flex w-full max-w-[1500px] flex-col items-center justify-between gap-4 px-6 text-center md:mb-14 md:flex-row md:items-end md:px-10 md:text-left">
        <div>
          <div className="mb-4 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:justify-start">
            <span className="inline-block h-px w-12 bg-neon" style={{ background: "var(--color-neon)" }} />
            01 — Capabilities
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
            What we do<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground md:text-base">
          Five disciplines. One studio. Engineered to ship the products our clients are remembered for.
        </p>
      </div>

      <div ref={track} className="flex flex-col gap-6 px-6 md:flex-row md:gap-8 md:px-10 md:will-change-transform">
        {services.map((s, i) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>>)[s.icon] || Icons.Sparkles;
          return (
            <Link
              key={s.id}
              to="/services/$serviceId"
              params={{ serviceId: s.id }}
              data-cursor="explore"
              className="group relative flex w-full flex-col overflow-hidden border border-border bg-elevated p-6 transition-all hover:border-neon/50 hover:-translate-y-1 sm:p-8 md:h-[64vh] md:max-h-[600px] md:min-h-[440px] md:w-[460px] md:shrink-0 block"
              style={{ background: "var(--color-elevated)" }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(600px circle at 50% 0%, color-mix(in oklab, var(--color-neon) 14%, transparent), transparent 70%)" }} />

              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center border border-border bg-background transition-colors group-hover:border-neon group-hover:text-neon">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[11px] tracking-widest text-muted-foreground">0{i + 1}</span>
              </div>

              <div className="relative mt-6 min-h-0 flex-1 md:overflow-y-auto md:pr-2">
                <h3 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl group-hover:text-neon transition-colors">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>

                <ul className="mt-5 grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-x-4">
                  {s.subServices.map((ss) => (
                    <li key={ss} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-foreground/80">
                      <span className="h-1 w-1 rounded-full bg-neon" style={{ background: "var(--color-neon)" }} />
                      {ss}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 inline-flex items-center gap-3 border-b border-foreground/20 pb-1 font-mono text-[11px] uppercase tracking-widest transition-colors group-hover:border-neon group-hover:text-neon">
                  Explore Practice <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          );
        })}
        <div className="hidden w-20 shrink-0 md:block" />
      </div>
    </section>
  );
}
