import { useEffect, useState } from "react";
import { useCMS } from "@/context/CMSContext";
import { Star } from "lucide-react";

export function Testimonials() {
  const { data } = useCMS();
  const [idx, setIdx] = useState(0);
  const items = data.testimonials;

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  if (!items.length) return null;
  const t = items[idx];

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-32" style={{ background: "var(--color-surface)" }}>
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto w-full max-w-[1500px] px-6 md:px-10">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="inline-block h-px w-12 bg-neon" style={{ background: "var(--color-neon)" }} />
              04 — Voices
            </div>
            <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
              Trusted by founders & operators<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px] md:items-end">
          <blockquote key={t.id} className="font-display text-3xl font-medium leading-snug tracking-tight text-balance md:text-5xl">
            <span className="text-neon" style={{ color: "var(--color-neon)" }}>“</span>
            {t.quote}
            <span className="text-neon" style={{ color: "var(--color-neon)" }}>”</span>
          </blockquote>

          <div className="flex items-center gap-4 border-l border-border pl-6 md:flex-col md:items-start">
            <img src={t.photo} alt={t.name} className="h-14 w-14 rounded-full object-cover" loading="lazy" />
            <div>
              <div className="font-display text-lg">{t.name}</div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{t.role} · {t.company}</div>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} className="fill-neon stroke-none" style={{ fill: "var(--color-neon)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              data-cursor="hover"
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-px w-16 transition-colors ${i === idx ? "bg-neon" : "bg-border"}`}
              style={i === idx ? { background: "var(--color-neon)" } : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
