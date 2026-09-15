import { useCMS } from "@/context/CMSContext";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const { data } = useCMS();
  const s = data.contact.socials;
  return (
    <footer className="noise-bg relative overflow-hidden border-t border-border bg-surface" style={{ background: "var(--color-surface)" }}>
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto w-full max-w-[1500px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-12">
          <div className="sm:col-span-2 md:col-span-5">
            {(data.global.footerLogo || data.global.logo) ? (
              <img src={data.global.footerLogo || data.global.logo} alt={data.global.siteName} className="h-16 w-auto md:h-20 object-contain" />
            ) : (
              <div className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                {data.global.siteName}<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
              </div>
            )}
            <p className="mt-6 max-w-md text-muted-foreground">{data.about.tagline}</p>
            <a
              href={`mailto:${data.contact.email}`}
              data-cursor="hover"
              className="mt-8 inline-block border-b border-foreground/30 pb-1 font-display text-2xl transition-colors hover:border-neon hover:text-neon"
            >
              {data.contact.email}
            </a>
          </div>

          <div className="md:col-span-2">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Services</div>
            <ul className="space-y-2">
              {data.services.filter(s => s.visible).map((s) => (
                <li key={s.id}><a className="text-sm text-foreground/80 hover:text-neon" data-cursor="hover" href="/services">{s.title}</a></li>
              ))}
            </ul>
          </div>

          {(data.footer?.columns ?? []).map((col) => (
            <div key={col.id} className="md:col-span-2">
              <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{col.title}</div>
              <ul className="space-y-2 text-sm text-foreground/80">
                {col.links.map((l) => (
                  <li key={l.id}><a className="hover:text-neon" data-cursor="hover" href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Studios</div>
            <p className="text-sm text-foreground/80">{data.contact.address}</p>
            <p className="mt-2 text-sm text-foreground/60">{data.contact.phone}</p>
            <div className="mt-6 flex gap-3">
              {s.linkedin && <a href={s.linkedin} data-cursor="hover" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-neon hover:text-neon"><Linkedin size={16}/></a>}
              {s.twitter && <a href={s.twitter} data-cursor="hover" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-neon hover:text-neon"><Twitter size={16}/></a>}
              {s.instagram && <a href={s.instagram} data-cursor="hover" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-neon hover:text-neon"><Instagram size={16}/></a>}
              {s.github && <a href={s.github} data-cursor="hover" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-neon hover:text-neon"><Github size={16}/></a>}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 font-mono text-[11px] tracking-widest text-muted-foreground md:flex-row md:items-center">
          <span>{data.global.footerCopy}</span>
          <span>{data.about.headquarters}</span>
        </div>

        {/* Big bold statement filling the blank space */}
        <div className="relative mt-16 border-t border-border pt-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h3 className="font-display text-[15vw] font-black leading-[0.85] tracking-tighter sm:text-[12vw] md:text-[10vw]">
              {data.footer?.bigLine1 ?? "LET'S"}<br />
              <span className="italic text-neon" style={{ color: "var(--color-neon)" }}>{data.footer?.bigLine2 ?? "build."}</span>
            </h3>
            <a
              href={data.footer?.bigCtaLink ?? "/contact"}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 self-start border-b-2 border-foreground/40 pb-2 font-display text-2xl transition-colors hover:border-neon hover:text-neon md:self-end md:text-3xl"
            >
              {data.footer?.bigCtaLabel ?? "Start a project"}
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Marquee + floating 3D shape */}
      <div className="relative mt-12 overflow-hidden border-t border-border py-8">
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 md:block" style={{ perspective: 800 }}>
          <div className="footer-3d-spin relative h-24 w-24" style={{ transformStyle: "preserve-3d" }}>
            {[
              "translateZ(48px)","rotateY(180deg) translateZ(48px)",
              "rotateY(90deg) translateZ(48px)","rotateY(-90deg) translateZ(48px)",
              "rotateX(90deg) translateZ(48px)","rotateX(-90deg) translateZ(48px)",
            ].map((t, i) => (
              <div key={i} className="absolute inset-0 border" style={{
                transform: t,
                borderColor: "color-mix(in oklab, var(--color-neon) 70%, transparent)",
                background: "linear-gradient(135deg, color-mix(in oklab, var(--color-neon) 14%, transparent), transparent)",
              }} />
            ))}
          </div>
        </div>
        <div className="footer-marquee flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-10 px-6 font-display text-[12vw] font-black leading-none tracking-tighter md:text-[9vw]">
              {(data.footer?.marqueeWords ?? ["MOTION","IN","TECH"]).map((w, i) => (
                <span key={i} className="flex items-center gap-10">
                  <span className={i % 2 ? "italic text-foreground/30" : ""}>{w}</span>
                  <span className="text-neon" style={{ color: "var(--color-neon)" }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes footerMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .footer-marquee { animation: footerMarquee 40s linear infinite; }
        @keyframes footerSpin { from { transform: rotateX(0) rotateY(0); } to { transform: rotateX(360deg) rotateY(360deg); } }
        .footer-3d-spin { animation: footerSpin 18s linear infinite; }
      `}</style>
    </footer>
  );
}

