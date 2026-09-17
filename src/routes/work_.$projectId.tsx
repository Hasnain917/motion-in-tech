import { createFileRoute, Link } from "@tanstack/react-router";
import { useCMS } from "@/context/CMSContext";
import { CTABanner } from "@/components/sections/CTABanner";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Globe, Layers, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/work_/$projectId")({
  head: ({ params }) => ({
    meta: [
      { title: `Project Details — Motion In Tech` },
      { name: "description", content: "Case study and engineering breakdown by Motion In Tech." },
    ],
  }),
  component: ProjectDetailPage,
});

export function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const { data } = useCMS();

  const allProjects = data.projects.filter((p) => p.visible);
  const projectIndex = allProjects.findIndex((p) => p.id === projectId || p.title.toLowerCase().replace(/\s+/g, "-") === projectId.toLowerCase());
  const project = allProjects[projectIndex] ?? allProjects.find((p) => p.id === projectId) ?? allProjects[0];

  if (!project) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-6 text-center">
        <h1 className="font-display text-4xl font-bold">Project Not Found</h1>
        <p className="mt-3 text-muted-foreground">The case study you are looking for has been archived.</p>
        <Link to="/work" className="btn-neon-hover mt-8 inline-flex items-center gap-2 border border-neon px-6 py-3 font-mono text-xs uppercase tracking-widest text-neon">
          <ArrowLeft size={14} /> Back to all work
        </Link>
      </main>
    );
  }

  const nextProject = allProjects[(projectIndex + 1) % allProjects.length];
  const prevProject = allProjects[(projectIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <main className="bg-background text-foreground">
      {/* Project Hero */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28 border-b border-border">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
        <div
          className="pointer-events-none absolute right-10 top-20 h-96 w-96 rounded-full blur-[140px] opacity-25"
          style={{ background: "var(--color-neon)" }}
        />

        <div className="relative mx-auto w-full max-w-[1500px] px-6 md:px-10">
          <Link
            to="/work"
            data-cursor="hover"
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-neon transition-colors"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to Selected Work
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-neon" style={{ color: "var(--color-neon)" }}>
                <span className="inline-block h-px w-8 bg-neon" style={{ background: "var(--color-neon)" }} />
                Case Study · {project.category}
              </div>
              <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-8xl">
                {project.title}<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#details"
                data-cursor="hover"
                className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors hover:border-foreground"
              >
                Overview
              </a>
              <Link
                to="/contact"
                data-cursor="hover"
                className="inline-flex items-center gap-2 border border-neon bg-neon px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-background font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "var(--color-neon)", borderColor: "var(--color-neon)" }}
              >
                Start Similar Project <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Quick Meta Grid */}
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4 md:gap-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Discipline</div>
              <div className="mt-1 font-display text-lg">{project.category}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Timeline</div>
              <div className="mt-1 font-display text-lg">12 Weeks to Production</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Deliverables</div>
              <div className="mt-1 font-display text-lg">Architecture, Web, Mobile</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Status</div>
              <div className="mt-1 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neon" style={{ color: "var(--color-neon)" }}>
                <span className="h-2 w-2 rounded-full bg-neon animate-pulse" style={{ background: "var(--color-neon)" }} /> Live in Production
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Showcase Banner */}
      <section className="relative mx-auto w-full max-w-[1500px] px-6 py-12 md:px-10">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-border bg-elevated" style={{ background: "var(--color-elevated)" }}>
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Neon Corner Brackets */}
          <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2" style={{ borderColor: "var(--color-neon)" }} />
          <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2" style={{ borderColor: "var(--color-neon)" }} />
          <span className="pointer-events-none absolute left-4 bottom-4 h-6 w-6 border-l-2 border-b-2" style={{ borderColor: "var(--color-neon)" }} />
          <span className="pointer-events-none absolute right-4 bottom-4 h-6 w-6 border-r-2 border-b-2" style={{ borderColor: "var(--color-neon)" }} />
        </div>
      </section>

      {/* Deep Dive Case Study Content */}
      <section id="details" className="relative mx-auto w-full max-w-[1500px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-16">
          {/* Main Description & Narrative */}
          <div className="space-y-16 md:col-span-8">
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">01 — Overview</div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Engineering a category-defining experience<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                {project.description}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Our objective was to dismantle existing industry friction points and deliver an interface that blends raw computing horsepower with cinematic fluid responsiveness. Every micro-interaction was profiled to execute under 16ms render budgets.
              </p>
            </div>

            {/* Challenge & Solution Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="border border-border bg-surface p-8" style={{ background: "var(--color-surface)" }}>
                <div className="flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground mb-6">
                  <Zap size={18} className="text-neon" style={{ color: "var(--color-neon)" }} />
                </div>
                <h3 className="font-display text-2xl font-bold">The Challenge</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Handling high-throughput real-time data streams while maintaining sub-50ms latency across global endpoints, without compromising memory overhead on low-power devices.
                </p>
              </div>

              <div className="border border-neon/30 bg-surface p-8" style={{ background: "var(--color-surface)", borderColor: "color-mix(in oklab, var(--color-neon) 30%, transparent)" }}>
                <div className="flex h-10 w-10 items-center justify-center border border-neon bg-background text-neon mb-6" style={{ borderColor: "var(--color-neon)", color: "var(--color-neon)" }}>
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="font-display text-2xl font-bold">The Solution</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  An edge-first distributed architecture with optimistic state hydration, bespoke WebGL shaders for high-density rendering, and strict zero-reflow layout orchestration.
                </p>
              </div>
            </div>

            {/* Engineering Highlights */}
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">02 — Architecture</div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Technical Pillars</h2>
              <div className="mt-8 space-y-4">
                {[
                  { title: "Sub-50ms Interaction Budget", desc: "Every user touchpoint is decoupled from network waits using optimistic UI updates and background reconciliation." },
                  { title: "Edge-Cached High Availability", desc: "Static assets and dynamic API queries cached across 300+ edge nodes with automatic failover." },
                  { title: "Enterprise Grade Security", desc: "End-to-end payload encryption, rigorous token rotation, and zero-trust authentication pipelines." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 border border-border p-6 bg-surface/50">
                    <span className="font-mono text-xs uppercase tracking-widest text-neon mt-1" style={{ color: "var(--color-neon)" }}>0{idx + 1}</span>
                    <div>
                      <h4 className="font-display text-xl font-bold">{item.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Specs & Metrics */}
          <aside className="space-y-10 md:col-span-4">
            {/* Impact Metrics Box */}
            <div className="border border-neon/40 bg-elevated p-8 shadow-[0_0_40px_-15px_color-mix(in_oklab,var(--color-neon)_30%,transparent)]" style={{ background: "var(--color-elevated)", borderColor: "color-mix(in oklab, var(--color-neon) 40%, transparent)" }}>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon" style={{ color: "var(--color-neon)" }}>Impact Metrics</div>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="font-display text-5xl font-bold text-neon" style={{ color: "var(--color-neon)" }}>+140%</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">User Conversion Lift</div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="font-display text-4xl font-bold">40ms</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Global P99 Response Time</div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="font-display text-4xl font-bold">99.99%</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Uptime Reliability</div>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="border border-border bg-surface p-8" style={{ background: "var(--color-surface)" }}>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Tech Stack</div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-border bg-background px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground/80 hover:border-neon hover:text-neon transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Inquiries Card */}
            <div className="border border-border bg-surface p-8" style={{ background: "var(--color-surface)" }}>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Have a similar goal?</div>
              <h4 className="mt-2 font-display text-2xl font-bold">Let&apos;s build your flagship product.</h4>
              <Link
                to="/contact"
                data-cursor="hover"
                className="btn-neon-hover mt-6 inline-flex w-full items-center justify-center gap-2 border border-neon py-3.5 font-mono text-xs uppercase tracking-widest text-neon"
              >
                Inquire now →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Next / Previous Project Bar */}
      <section className="border-y border-border bg-surface py-12" style={{ background: "var(--color-surface)" }}>
        <div className="mx-auto flex w-full max-w-[1500px] flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center md:px-10">
          <Link
            to="/work/$projectId"
            params={{ projectId: prevProject.id }}
            data-cursor="hover"
            className="group flex flex-col"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1 group-hover:text-neon">
              <ArrowLeft size={12} /> Previous Project
            </span>
            <span className="font-display text-2xl font-bold tracking-tight mt-1 group-hover:text-neon transition-colors">
              {prevProject.title}
            </span>
          </Link>

          <Link
            to="/work"
            data-cursor="hover"
            className="self-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
          >
            [ All Projects ]
          </Link>

          <Link
            to="/work/$projectId"
            params={{ projectId: nextProject.id }}
            data-cursor="hover"
            className="group flex flex-col text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center justify-end gap-1 group-hover:text-neon">
              Next Project <ArrowUpRight size={12} />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight mt-1 group-hover:text-neon transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
