import { useEffect, useState } from "react";

export function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18 + 8);
      setProgress(Math.round(p));
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
      }
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background transition-[opacity,transform] duration-700 ${
        done ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      <div className="font-display text-5xl font-bold tracking-tight text-foreground md:text-7xl">
        MIT<span className="text-neon">.</span>
      </div>
      <div className="mt-10 h-px w-64 overflow-hidden bg-border">
        <div
          className="h-full bg-neon transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%`, background: "var(--color-neon)" }}
        />
      </div>
      <div className="mt-4 font-mono text-[11px] tracking-widest text-muted-foreground">
        LOADING — {progress.toString().padStart(3, "0")}
      </div>
    </div>
  );
}
