import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-ph-word]", {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.06,
        delay: 0.1,
      });
      gsap.from("[data-ph-meta]", {
        opacity: 0,
        y: 20,
        delay: 0.6,
        duration: 0.8,
        ease: "expo.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-background pb-[80px] pt-36 md:pb-32 md:pt-56">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full opacity-20 blur-[140px]"
        style={{ background: "var(--color-neon)" }}
      />
      <div className="relative mx-auto w-full max-w-[1500px] px-6 text-center md:px-10 md:text-left">
        <div
          data-ph-meta
          className="mb-8 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:justify-start"
        >
          <span className="inline-block h-px w-12 bg-neon" style={{ background: "var(--color-neon)" }} />
          {eyebrow}
        </div>
        <h1 className="font-display text-4xl font-bold leading-[0.9] tracking-tighter sm:text-6xl md:text-[10vw]">
          {title.split(" ").map((w, i) => (
            <span key={i} className="mr-2 inline-block overflow-hidden align-bottom sm:mr-4">
              <span data-ph-word className="inline-block">{w}</span>
            </span>
          ))}
          {accent && (
            <span className="mr-2 inline-block overflow-hidden align-bottom sm:mr-4">
              <span
                data-ph-word
                className="inline-block"
                style={{ color: "var(--color-neon)" }}
              >
                {accent}
              </span>
            </span>
          )}
        </h1>
        {subtitle && (
          <p data-ph-meta className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg md:mx-0 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
