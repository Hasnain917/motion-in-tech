import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-px bg-transparent">
      <div className="h-full bg-neon transition-[width] duration-100" style={{ width: `${p}%`, background: "var(--color-neon)" }} />
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button
      aria-label="Back to top"
      data-cursor="hover"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-foreground/20 bg-background/70 backdrop-blur transition-all hover:border-neon hover:text-neon ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={16} />
    </button>
  );
}

export function CookieBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("mit-cookie-ok")) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 z-[55] mx-auto flex max-w-xl items-center justify-between gap-3 border border-border bg-elevated/90 p-3 backdrop-blur sm:bottom-6 sm:left-6 sm:right-6 sm:gap-4 sm:p-4 md:left-auto md:right-6" style={{ background: "color-mix(in oklab, var(--color-elevated) 90%, transparent)" }}>
      <p className="text-[11px] leading-snug text-muted-foreground sm:text-xs">We use cookies to elevate your experience. Continuing implies consent.</p>
      <button
        data-cursor="hover"
        className="shrink-0 border border-neon px-3 py-1.5 font-mono text-[10px] tracking-widest text-neon hover:bg-neon hover:text-background sm:px-4 sm:py-2"
        style={{ borderColor: "var(--color-neon)", color: "var(--color-neon)" }}
        onClick={() => { localStorage.setItem("mit-cookie-ok", "1"); setShow(false); }}
      >
        OK
      </button>
    </div>
  );
}
