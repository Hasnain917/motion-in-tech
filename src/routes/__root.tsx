import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CMSProvider, useCMS } from "@/context/CMSContext";
import { Cursor } from "@/components/layout/Cursor";
import { Loader } from "@/components/layout/Loader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { BackToTop, CookieBar, ScrollProgress } from "@/components/layout/Chrome";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-display text-[18vw] font-bold leading-none tracking-tighter text-foreground/10">404</div>
        <h2 className="-mt-12 font-display text-3xl font-bold tracking-tight">Page not found.</h2>
        <p className="mt-3 text-sm text-muted-foreground">The page you&apos;re looking for has drifted into the void.</p>
        <Link to="/" data-cursor="hover" className="mt-8 inline-block border border-neon px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-neon hover:bg-neon hover:text-background" style={{ borderColor: "var(--color-neon)", color: "var(--color-neon)" }}>
          Go home →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-3xl font-bold">Something glitched.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={reset} className="border border-neon px-5 py-2 font-mono text-[11px] uppercase tracking-widest text-neon" style={{ borderColor: "var(--color-neon)", color: "var(--color-neon)" }}>Try again</button>
          <a href="/" className="border border-foreground/20 px-5 py-2 font-mono text-[11px] uppercase tracking-widest">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Motion In Tech — Award-winning Software Studio" },
      { name: "description", content: "We design and engineer iconic digital products for ambitious teams. Web, mobile, ERP, design and IT consulting." },
      { name: "author", content: "Motion In Tech" },
      { property: "og:title", content: "Motion In Tech — Award-winning Software Studio" },
      { property: "og:description", content: "We design and engineer iconic digital products for ambitious teams. Web, mobile, ERP, design and IT consulting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#030303" },
      { name: "twitter:title", content: "Motion In Tech — Award-winning Software Studio" },
      { name: "twitter:description", content: "We design and engineer iconic digital products for ambitious teams. Web, mobile, ERP, design and IT consulting." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/Zyax0ZxBbIbBpdu5FfBmLzw6mMk2/social-images/social-1779522027945-motion-in-tech.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/Zyax0ZxBbIbBpdu5FfBmLzw6mMk2/social-images/social-1779522027945-motion-in-tech.webp" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SiteChrome() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = path.startsWith("/admin");
  return (
    <>
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <Navbar />}
      <Outlet />
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTop />}
      {!isAdmin && <CookieBar />}
      <Cursor />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CMSProvider>
        <Loader />
        <SmoothScroll>
          <SiteChrome />
        </SmoothScroll>
      </CMSProvider>
    </QueryClientProvider>
  );
}

// Silence the unused warning when CMS is needed at root level later.
void useCMS;
