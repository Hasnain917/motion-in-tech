import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { k: "01", t: "Realtime", d: "Sub-50ms interaction loops, live multiplayer, presence." },
  { k: "02", t: "Spatial", d: "WebGL stages, 3D scenes, immersive product worlds." },
  { k: "03", t: "Motion", d: "GSAP scroll choreography & cinematic transitions." },
  { k: "04", t: "Intelligence", d: "LLM-powered flows, semantic search, agents." },
  { k: "05", t: "Identity", d: "Type systems, sound, motion — a full brand OS." },
  { k: "06", t: "Velocity", d: "Ship weekly. Production-grade from day one." },
];

export function Capabilities() {
  const root = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-cap]");
      cards.forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateX: -20,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });

        const inner = card.querySelector<HTMLElement>("[data-inner]");
        const glow = card.querySelector<HTMLElement>("[data-glow]");
        let r = card.getBoundingClientRect();
        const onEnter = () => {
          r = card.getBoundingClientRect();
        };
        const onMove = (e: MouseEvent) => {
          const w = r.width || 300;
          const h = r.height || 400;
          const x = (e.clientX - r.left) / w - 0.5;
          const y = (e.clientY - r.top) / h - 0.5;
          gsap.to(inner, {
            rotateY: x * 14,
            rotateX: -y * 14,
            transformPerspective: 900,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
          if (glow) {
            glow.style.background = `radial-gradient(420px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, color-mix(in oklab, var(--color-neon) 35%, transparent), transparent 60%)`;
          }
        };
        const onLeave = () => {
          gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power3.out", overwrite: "auto" });
          if (glow) glow.style.background = "transparent";
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mousemove", onMove, { passive: true });
        card.addEventListener("mouseleave", onLeave);
      });

      if (orbRef.current) {
        gsap.to(orbRef.current, {
          yPercent: -25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-background py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        ref={orbRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-neon) 30%, transparent), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 md:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end md:gap-8">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="inline-block h-px w-12" style={{ background: "var(--color-neon)" }} />
              04 — Capabilities
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl">
              Built for the<br />
              <span style={{ color: "var(--color-neon)" }}>impossible.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Hover any card — every surface responds. Six disciplines, one team, zero handoffs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <Link
              key={it.k}
              to="/services"
              data-cap
              data-cursor="hover"
              className="group relative overflow-hidden border border-border p-6 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-[color:var(--color-neon)] hover:shadow-[0_30px_60px_-25px_color-mix(in_oklab,var(--color-neon)_55%,transparent)] sm:p-8 block"
              style={{ background: "var(--color-elevated)", transformStyle: "preserve-3d" }}
            >
              <div data-glow className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--color-neon) 12%, transparent), transparent 55%)",
                }}
              />
              <div data-inner className="relative" style={{ transformStyle: "preserve-3d" }}>
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "var(--color-neon)", transform: "translateZ(40px)" }}
                >
                  {it.k}
                </div>
                <h3
                  className="mt-6 font-display text-4xl font-bold leading-none tracking-tighter md:text-5xl"
                  style={{ transform: "translateZ(60px)" }}
                >
                  {it.t}
                </h3>
                <p
                  className="mt-4 max-w-xs text-sm text-muted-foreground"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {it.d}
                </p>
                <div
                  className="mt-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground/60 transition-all duration-300 group-hover:text-foreground group-hover:gap-4"
                  style={{ transform: "translateZ(50px)" }}
                >
                  Explore <span style={{ color: "var(--color-neon)" }}>→</span>
                </div>
              </div>
              <span
                className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t transition-all duration-500 group-hover:h-6 group-hover:w-6"
                style={{ borderColor: "var(--color-neon)" }}
              />
              <span
                className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b transition-all duration-500 group-hover:h-6 group-hover:w-6"
                style={{ borderColor: "var(--color-neon)" }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
