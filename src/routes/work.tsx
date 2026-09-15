import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCMS } from "@/context/CMSContext";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/sections/CTABanner";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Motion In Tech" },
      { name: "description", content: "Selected work from Motion In Tech — fintech, mobility, commerce, health and creative platforms." },
      { property: "og:title", content: "Selected Work — Motion In Tech" },
      { property: "og:description", content: "Cinematic digital products engineered to ship." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { data } = useCMS();
  const all = data.projects.filter((p) => p.visible);
  const categories = useMemo(() => ["All", ...Array.from(new Set(all.map((p) => p.category)))], [all]);
  const [active, setActive] = useState("All");
  const list = active === "All" ? all : all.filter((p) => p.category === active);

  return (
    <main>
      <PageHero
        eyebrow="03 — Selected Work"
        title="Recent"
        accent="projects."
        subtitle="A small selection of the work we are most proud of. Full case studies available on request."
      />

      <section className="relative bg-background pb-32">
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10">
          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-border pb-6">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                data-cursor="hover"
                className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  active === c
                    ? "border-neon text-neon"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
                style={active === c ? { borderColor: "var(--color-neon)", color: "var(--color-neon)" } : undefined}
              >
                {c}
                <span className="ml-2 opacity-50">
                  {c === "All" ? all.length : all.filter((p) => p.category === c).length}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {list.map((p, i) => (
              <a
                key={p.id}
                href="#"
                data-cursor="view"
                className="group relative block aspect-[4/3] overflow-hidden border border-border bg-elevated"
                style={{ background: "var(--color-elevated)" }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                  <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neon" style={{ color: "var(--color-neon)" }}>
                      {p.category}
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{p.title}</h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {p.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {p.tags.map((t) => (
                        <span key={t} className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {list.length === 0 && (
            <div className="py-32 text-center text-muted-foreground">No projects in this category yet.</div>
          )}
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
