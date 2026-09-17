import { useEffect, useRef } from "react";
import { useCMS } from "@/context/CMSContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const { data } = useCMS();
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !line.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(line.current, { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 80%", scrub: 0.5 },
      });
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [data.process]);

  return (
    <section id="process" ref={root} className="relative bg-background py-32">
      <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10">
        <div className="mb-20 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="inline-block h-px w-12 bg-neon" style={{ background: "var(--color-neon)" }} />
            02 — How we work
          </div>
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
            A process engineered for ambitious teams<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
          </h2>
        </div>

        <div className="relative pl-8 md:pl-24">
          <div className="absolute left-0 top-0 h-full w-px bg-border md:left-10" />
          <div
            ref={line}
            className="absolute left-0 top-0 h-full w-px origin-top bg-neon md:left-10"
            style={{ background: "var(--color-neon)" }}
          />
          {data.process.map((p, i) => (
            <div key={p.id} data-step className="relative grid grid-cols-1 gap-2 border-b border-border py-10 md:grid-cols-[100px_1fr_2fr] md:items-baseline md:gap-12">
              <span className="absolute -left-[38px] top-12 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-neon md:-left-[62px]" style={{ background: "var(--color-neon)" }} />
              <span className="font-mono text-[11px] uppercase tracking-widest text-neon" style={{ color: "var(--color-neon)" }}>STEP / {String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{p.title}</h3>
              <p className="max-w-md text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
