import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) setVisible(true);
      const t = e.target as HTMLElement | null;
      const cursorEl = t?.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        setHover(true);
        const tag = cursorEl.getAttribute("data-cursor");
        setLabel(tag === "view" ? "VIEW" : tag === "explore" ? "EXPLORE" : "");
      } else {
        setHover(false);
        setLabel("");
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-neon mix-blend-difference"
        style={{ background: "var(--color-neon)" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex h-10 w-10 items-center justify-center rounded-full border border-neon/60 transition-[width,height,background] duration-200"
        style={{
          borderColor: "var(--color-neon)",
          width: hover ? 72 : 40,
          height: hover ? 72 : 40,
          marginLeft: hover ? -16 : 0,
          marginTop: hover ? -16 : 0,
          background: label ? "var(--color-neon)" : "transparent",
        }}
      >
        {label && <span className="font-mono text-[10px] font-medium tracking-widest text-background">{label}</span>}
      </div>
    </>
  );
}
