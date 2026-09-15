import { useEffect, useRef } from "react";
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
    <section id="services" ref={root} className="relative overflow-hidden bg-background py-20 md:py-24">
      <div className="mx-auto mb-10 flex w-full max-w-[1500px] items-end justify-between px-6 md:mb-14 md:px-10">
        <div>
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="inline-block h-px w-12 bg-neon" style={{ background: "var(--color-neon)" }} />
            01 — Capabilities
          </div>
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
            What we do<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
          </h2>
        </div>
        <p className="hidden max-w-sm text-muted-foreground md:block">
          Five disciplines. One studio. Engineered to ship the products our clients are remembered for.
        </p>
      </div>

      <div ref={track} className="flex gap-6 px-6 will-change-transform md:gap-8 md:px-10">
        {services.map((s, i) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>>)[s.icon] || Icons.Sparkles;
          return (
            <article
              key={s.id}
              data-cursor="explore"
              className="group relative flex h-[64vh] max-h-[600px] min-h-[440px] w-[86vw] shrink-0 flex-col overflow-hidden border border-border bg-elevated p-6 transition-colors hover:border-neon/40 md:w-[460px] md:p-8"
              style={{ background: "var(--color-elevated)" }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(600px circle at 50% 0%, color-mix(in oklab, var(--color-neon) 14%, transparent), transparent 70%)" }} />

              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center border border-border bg-background transition-colors group-hover:border-neon group-hover:text-neon">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[11px] tracking-widest text-muted-foreground">0{i + 1}</span>
              </div>

              <div className="relative mt-6 min-h-0 flex-1 overflow-y-auto pr-2">
                <h3 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">{s.title}</h3>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">{s.description}</p>

                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {s.subServices.map((ss) => (
                    <li key={ss} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-foreground/80">
                      <span className="h-1 w-1 rounded-full bg-neon" style={{ background: "var(--color-neon)" }} />
                      {ss}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 inline-flex items-center gap-3 border-b border-foreground/20 pb-1 font-mono text-[11px] uppercase tracking-widest transition-colors group-hover:border-neon group-hover:text-neon">
                  Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </article>
          );
        })}
        <div className="w-20 shrink-0" />
      </div>
    </section>
  );
}
