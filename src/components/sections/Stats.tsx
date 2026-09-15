import { useEffect, useRef } from "react";
import { useCMS } from "@/context/CMSContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Stats() {
  const { data } = useCMS();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    if (!data.animateCounters) return;
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
        const target = Number(el.dataset.counter || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [data.animateCounters, data.stats]);

  return (
    <section ref={root} className="relative border-y border-border bg-surface py-24 md:py-32" style={{ background: "var(--color-surface)" }}>
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-2 gap-y-12 px-6 md:grid-cols-4 md:gap-0 md:px-10">
        {data.stats.map((s, i) => {
          const num = Number(String(s.value).replace(/[^\d]/g, "")) || 0;
          const suffix = String(s.value).replace(/[\d.,]/g, "");
          return (
            <div key={s.id} className={`flex flex-col gap-3 md:px-8 ${i !== 0 ? "md:border-l md:border-border" : ""}`}>
              <div className="font-display text-6xl font-bold tracking-tighter md:text-7xl lg:text-8xl">
                <span data-counter={num}>{data.animateCounters ? 0 : num}</span><span className="text-neon" style={{ color: "var(--color-neon)" }}>{suffix || "+"}</span>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
