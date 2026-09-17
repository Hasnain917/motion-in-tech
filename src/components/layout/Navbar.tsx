import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCMS } from "@/context/CMSContext";

export function Navbar() {
  const { data } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = data.header?.navLinks ?? [];
  const ctaLabel = data.header?.ctaLabel ?? "Start a project";
  const ctaLink = data.header?.ctaLink ?? "/contact";

  const [logoErr, setLogoErr] = useState(false);
  const logoUrl = !logoErr ? (data.global.headerLogo || data.global.logo) : "";

  return (
    <>
      {data.global.announcement.enabled && (
        <a
          href={data.global.announcement.link}
          className="block w-full bg-neon py-2 text-center font-mono text-[11px] tracking-widest text-background"
          style={{ background: "var(--color-neon)" }}
          data-cursor="hover"
        >
          {data.global.announcement.text} →
        </a>
      )}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          data.global.announcement.enabled ? "top-9" : "top-0"
        } ${scrolled ? "py-3" : "py-5"}`}
        style={{
          background: scrolled ? "color-mix(in oklab, var(--color-background) 80%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 md:px-10">
          <Link to="/" className="group flex items-center gap-2" data-cursor="hover">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={data.global.siteName}
                onError={() => setLogoErr(true)}
                className="h-8 w-auto md:h-10 object-contain transition-transform duration-500 group-hover:-translate-y-[2px]"
              />
            ) : (
              <span className="font-display text-2xl font-bold tracking-tight">
                {data.global.siteName.split(" ").map((w, i, arr) => (
                  <span key={i} className="inline-block transition-transform duration-500 group-hover:-translate-y-[2px]">{w}{i < arr.length - 1 ? "\u00A0" : ""}</span>
                ))}
                <span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
              </span>
            )}
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={n.href}
                data-cursor="hover"
                className="group relative px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
                <span className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-neon transition-transform duration-300 group-hover:scale-x-100" style={{ background: "var(--color-neon)" }} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={ctaLink}
              data-cursor="hover"
              className="hidden border border-foreground/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors hover:border-neon hover:text-neon md:inline-block"
            >
              {ctaLabel}
            </a>
            <button
              aria-label="Menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-background pt-24 transition-opacity md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <nav className="flex flex-col gap-1 px-6">
          {nav.map((n) => (
            <a
              key={n.id}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-5 font-display text-3xl"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
