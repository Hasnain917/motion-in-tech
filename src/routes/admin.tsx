import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useCMS } from "@/context/CMSContext";
import { tabRegistry } from "@/components/cms/tabs";
import { Btn } from "@/components/cms/ui";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const ADMIN_PASSWORD = "motionadmin123";
const AUTH_KEY = "mit-admin-auth";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
  }, []);
  if (!authed) return <Gate onSuccess={() => { sessionStorage.setItem(AUTH_KEY, "1"); setAuthed(true); }} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }} />;
}

function Gate({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  return (
    <main className="grid-bg flex min-h-screen items-center justify-center bg-background px-6">
      <form
        onSubmit={(e) => { e.preventDefault(); if (pw === ADMIN_PASSWORD) onSuccess(); else setError("Incorrect password"); }}
        className="w-full max-w-sm border border-border bg-elevated p-8"
        style={{ background: "var(--color-elevated)" }}
      >
        <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Restricted Area</div>
        <h1 className="font-display text-4xl font-bold tracking-tight">CMS<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span></h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter the admin password to continue.</p>
        <input
          type="password"
          autoFocus
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="mt-6 w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-neon"
          placeholder="Password"
        />
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
        <button type="submit" className="mt-4 w-full border border-neon bg-neon py-3 font-mono text-[10px] uppercase tracking-widest text-background transition-colors hover:bg-transparent hover:text-neon" style={{ borderColor: "var(--color-neon)" }}>
          Enter
        </button>
      </form>
    </main>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { saved, exportJson, importJson, reset, data, setData } = useCMS();
  const [tab, setTab] = useState(tabRegistry[0].id);
  const fileRef = useRef<HTMLInputElement>(null);

  // history for undo/redo
  const history = useRef<typeof data[]>([data]);
  const cursor = useRef(0);
  useEffect(() => {
    if (history.current[cursor.current] !== data) {
      history.current = [...history.current.slice(0, cursor.current + 1), data].slice(-50);
      cursor.current = history.current.length - 1;
    }
  }, [data]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        if (cursor.current > 0) { cursor.current -= 1; setData(history.current[cursor.current]); }
      }
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "y" || (e.shiftKey && e.key.toLowerCase() === "z"))) {
        e.preventDefault();
        if (cursor.current < history.current.length - 1) { cursor.current += 1; setData(history.current[cursor.current]); }
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [setData]);

  const current = tabRegistry.find((t) => t.id === tab) || tabRegistry[0];

  return (
    <main className="min-h-screen bg-background pt-0">
      {/* Top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:px-6">
        <div className="flex items-center gap-4">
          <a href="/" className="font-display text-xl font-bold tracking-tight">MIT<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span> <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">CMS</span></a>
          <span className={`font-mono text-[10px] uppercase tracking-widest ${saved ? "text-neon" : "text-muted-foreground"}`} style={saved ? { color: "var(--color-neon)" } : undefined}>
            {saved ? "✓ Saved" : "Saving…"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Btn onClick={() => window.open("/", "_blank")}>Preview Site ↗</Btn>
          <Btn onClick={exportJson}>Export JSON</Btn>
          <Btn onClick={() => fileRef.current?.click()}>Import JSON</Btn>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) await importJson(f); }} />
          <Btn variant="danger" onClick={() => { if (confirm("Reset all content to defaults?")) reset(); }}>Reset</Btn>
          <Btn variant="ghost" onClick={onLogout}>Logout</Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="border-b border-border lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] lg:border-b-0 lg:border-r">
          <nav className="flex flex-row overflow-x-auto lg:flex-col">
            {tabRegistry.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-shrink-0 border-l-2 px-5 py-3 text-left font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  tab === t.id ? "border-neon text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                style={tab === t.id ? { borderColor: "var(--color-neon)" } : undefined}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <section className="p-4 md:p-8">
          <div className="mb-6">
            <h1 className="font-display text-4xl font-bold tracking-tight">{current.label}<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span></h1>
            <p className="mt-1 text-sm text-muted-foreground">Edits save automatically. Ctrl/Cmd+Z to undo · Ctrl/Cmd+Y to redo.</p>
          </div>
          {current.render()}
        </section>
      </div>
    </main>
  );
}
