import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? h.scrollTop / max : 0;
        bar.style.transform = `scaleX(${p})`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full origin-left will-change-transform"
        style={{
          background: "var(--color-neon)",
          transform: "scaleX(0)",
          transition: "transform 0.05s linear",
        }}
      />
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  const showRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const next = window.scrollY > 500;
        if (next !== showRef.current) {
          showRef.current = next;
          setShow(next);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      aria-label="Back to top"
      data-cursor="hover"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-foreground/20 bg-background/80 backdrop-blur transition-all duration-300 hover:border-neon hover:text-neon ${
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
