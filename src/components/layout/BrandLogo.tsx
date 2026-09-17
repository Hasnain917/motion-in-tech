import { useState } from "react";

interface BrandLogoProps {
  customLogoUrl?: string;
  siteName?: string;
  variant?: "header" | "footer";
}

export function BrandLogo({ customLogoUrl, siteName = "Motion In Tech", variant = "header" }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  // If a valid custom image URL is provided and has not errored (exclude temporary /__l5e/ paths)
  const isCustomImage =
    Boolean(customLogoUrl) &&
    !imgError &&
    !customLogoUrl?.includes("/__l5e/") &&
    (customLogoUrl?.startsWith("http") || customLogoUrl?.startsWith("data:") || customLogoUrl?.startsWith("/"));

  if (isCustomImage && customLogoUrl) {
    return (
      <img
        src={customLogoUrl}
        alt={siteName}
        onError={() => setImgError(true)}
        className={variant === "footer" ? "h-16 w-auto md:h-20 object-contain" : "h-8 w-auto md:h-10 object-contain transition-transform duration-500 group-hover:-translate-y-[2px]"}
      />
    );
  }

  if (variant === "footer") {
    return (
      <div className="flex items-center gap-4">
        {/* Modern Vector Geometric Emblem */}
        <div className="flex h-12 w-12 md:h-14 md:md:w-14 items-center justify-center rounded-xl border border-neon/30 bg-neon/10 backdrop-blur" style={{ borderColor: "color-mix(in oklab, var(--color-neon) 40%, transparent)" }}>
          <svg className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 36V12L24 28V36" fill="var(--color-neon)" />
            <path d="M36 36V12L24 28V36" fill="var(--color-neon)" fillOpacity="0.75" />
            <circle cx="24" cy="14" r="3.5" fill="var(--color-neon)" />
          </svg>
        </div>
        <div>
          <div className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-none">
            {siteName}<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Software Studio
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 transition-transform duration-500 group-hover:-translate-y-[2px]">
      {/* Modern Header Vector Emblem */}
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon/40 bg-neon/10 shadow-[0_0_15px_-3px_color-mix(in_oklab,var(--color-neon)_30%,transparent)]">
        <svg className="h-5 w-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 36V12L24 28V36" fill="var(--color-neon)" />
          <path d="M36 36V12L24 28V36" fill="var(--color-neon)" fillOpacity="0.8" />
          <circle cx="24" cy="14" r="3.5" fill="var(--color-neon)" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-none">
          {siteName}<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
        </span>
      </div>
    </div>
  );
}
