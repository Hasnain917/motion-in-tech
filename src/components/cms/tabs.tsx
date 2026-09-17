import { useState, type ReactNode } from "react";
import { useCMS, cmsUid, type Service, type Project, type Stat, type Testimonial, type ProcessStep, type TeamMember, type Submission } from "@/context/CMSContext";
import { Btn, Field, ImageUpload, Input, MoveControls, SectionCard, Textarea, move } from "./ui";

/* ------------------------------ HERO ------------------------------ */
export function HeroTab() {
  const { data, setData } = useCMS();
  const h = data.hero;
  const set = (patch: Partial<typeof h>) => setData((d) => ({ ...d, hero: { ...d.hero, ...patch } }));
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <SectionCard title="Headline & Copy">
        <div className="space-y-5">
          <Field label="Headline"><Textarea value={h.headline} onChange={(e) => set({ headline: e.target.value })} rows={3} /></Field>
          <Field label="Sub-headline"><Input value={h.subHeadline} onChange={(e) => set({ subHeadline: e.target.value })} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="CTA 1 Label"><Input value={h.cta1.label} onChange={(e) => set({ cta1: { ...h.cta1, label: e.target.value } })} /></Field>
            <Field label="CTA 1 Link"><Input value={h.cta1.link} onChange={(e) => set({ cta1: { ...h.cta1, link: e.target.value } })} /></Field>
            <Field label="CTA 2 Label"><Input value={h.cta2.label} onChange={(e) => set({ cta2: { ...h.cta2, label: e.target.value } })} /></Field>
            <Field label="CTA 2 Link"><Input value={h.cta2.link} onChange={(e) => set({ cta2: { ...h.cta2, link: e.target.value } })} /></Field>
          </div>
          <Field label="Marquee items (one per line)">
            <Textarea
              value={h.marquee.join("\n")}
              onChange={(e) => set({ marquee: e.target.value.split("\n").filter(Boolean) })}
              rows={6}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Background">
        <div className="space-y-5">
          <Field label="Background Type">
            <div className="flex gap-2">
              {(["video", "image"] as const).map((t) => (
                <Btn key={t} variant={h.backgroundType === t ? "primary" : "default"} onClick={() => set({ backgroundType: t })}>{t}</Btn>
              ))}
            </div>
          </Field>
          <Field label="Background Image" hint="Used when type = image">
            <ImageUpload value={h.backgroundImage} onChange={(v) => set({ backgroundImage: v })} />
          </Field>
          <Field label="Background Video URL" hint="Used when type = video">
            <Input value={h.backgroundVideo} onChange={(e) => set({ backgroundVideo: e.target.value })} placeholder="https://… or upload below" />
            <label className="mt-2 inline-block cursor-pointer border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-foreground">
              Upload video file (base64)
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const r = new FileReader();
                  r.onload = () => set({ backgroundVideo: String(r.result || "") });
                  r.readAsDataURL(f);
                }}
              />
            </label>
            {h.backgroundVideo && (
              <video src={h.backgroundVideo} className="mt-3 h-32 w-full border border-border object-cover" muted autoPlay loop playsInline />
            )}
          </Field>
        </div>
      </SectionCard>
    </div>
  );
}

/* ------------------------------ SERVICES ------------------------------ */
export function ServicesTab() {
  const { data, setData } = useCMS();
  const setServices = (services: Service[]) => setData((d) => ({ ...d, services }));
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Btn variant="primary" onClick={() => setServices([...data.services, { id: cmsUid(), icon: "Sparkles", title: "New Service", description: "", subServices: [], technologies: [], visible: true }])}>+ Add Service</Btn>
      </div>
      {data.services.map((s, i) => (
        <SectionCard key={s.id} title={`${i + 1}. ${s.title || "Untitled"}`} actions={
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
              <input type="checkbox" checked={s.visible} onChange={(e) => setServices(data.services.map(x => x.id === s.id ? { ...x, visible: e.target.checked } : x))} />
              visible
            </label>
            <MoveControls
              onUp={() => setServices(move(data.services, i, -1))}
              onDown={() => setServices(move(data.services, i, 1))}
              onDelete={() => setServices(data.services.filter(x => x.id !== s.id))}
            />
          </div>
        }>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Title"><Input value={s.title} onChange={(e) => setServices(data.services.map(x => x.id === s.id ? { ...x, title: e.target.value } : x))} /></Field>
            <Field label="Icon (lucide-react name)" hint="e.g. Globe, Smartphone, Palette, Building2, Briefcase"><Input value={s.icon} onChange={(e) => setServices(data.services.map(x => x.id === s.id ? { ...x, icon: e.target.value } : x))} /></Field>
            <Field label="Description"><Textarea value={s.description} onChange={(e) => setServices(data.services.map(x => x.id === s.id ? { ...x, description: e.target.value } : x))} /></Field>
            <Field label="Sub-services (one per line)">
              <Textarea value={s.subServices.join("\n")} onChange={(e) => setServices(data.services.map(x => x.id === s.id ? { ...x, subServices: e.target.value.split("\n").filter(Boolean) } : x))} rows={5} />
            </Field>
            <Field label="Technologies (comma separated)">
              <Input value={s.technologies.join(", ")} onChange={(e) => setServices(data.services.map(x => x.id === s.id ? { ...x, technologies: e.target.value.split(",").map(t => t.trim()).filter(Boolean) } : x))} />
            </Field>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

/* ------------------------------ PROJECTS ------------------------------ */
export function PortfolioTab() {
  const { data, setData } = useCMS();
  const set = (projects: Project[]) => setData((d) => ({ ...d, projects }));
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Btn variant="primary" onClick={() => set([...data.projects, { id: cmsUid(), title: "New Project", category: "Web", description: "", tags: [], image: "", visible: true }])}>+ Add Project</Btn>
      </div>
      {data.projects.map((p, i) => (
        <SectionCard key={p.id} title={`${i + 1}. ${p.title}`} actions={
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
              <input type="checkbox" checked={p.visible} onChange={(e) => set(data.projects.map(x => x.id === p.id ? { ...x, visible: e.target.checked } : x))} />
              visible
            </label>
            <MoveControls
              onUp={() => set(move(data.projects, i, -1))}
              onDown={() => set(move(data.projects, i, 1))}
              onDelete={() => { if (confirm("Delete this project?")) set(data.projects.filter(x => x.id !== p.id)); }}
            />
          </div>
        }>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Title"><Input value={p.title} onChange={(e) => set(data.projects.map(x => x.id === p.id ? { ...x, title: e.target.value } : x))} /></Field>
            <Field label="Category"><Input value={p.category} onChange={(e) => set(data.projects.map(x => x.id === p.id ? { ...x, category: e.target.value } : x))} /></Field>
            <Field label="Description"><Textarea value={p.description} onChange={(e) => set(data.projects.map(x => x.id === p.id ? { ...x, description: e.target.value } : x))} /></Field>
            <Field label="Tags (comma separated)"><Input value={p.tags.join(", ")} onChange={(e) => set(data.projects.map(x => x.id === p.id ? { ...x, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) } : x))} /></Field>
            <div className="md:col-span-2"><Field label="Cover Image"><ImageUpload value={p.image} onChange={(v) => set(data.projects.map(x => x.id === p.id ? { ...x, image: v } : x))} /></Field></div>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

/* ------------------------------ STATS ------------------------------ */
export function StatsTab() {
  const { data, setData } = useCMS();
  const set = (stats: Stat[]) => setData((d) => ({ ...d, stats }));
  return (
    <div className="space-y-4">
      <SectionCard title="Settings">
        <label className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
          <input type="checkbox" checked={data.animateCounters} onChange={(e) => setData((d) => ({ ...d, animateCounters: e.target.checked }))} />
          Animate counters on scroll
        </label>
      </SectionCard>
      <div className="flex justify-end">
        <Btn variant="primary" onClick={() => set([...data.stats, { id: cmsUid(), value: "10", label: "New Stat" }])}>+ Add Stat</Btn>
      </div>
      {data.stats.map((s, i) => (
        <SectionCard key={s.id} title={`Stat ${i + 1}`} actions={
          <MoveControls
            onUp={() => set(move(data.stats, i, -1))}
            onDown={() => set(move(data.stats, i, 1))}
            onDelete={() => set(data.stats.filter(x => x.id !== s.id))}
          />
        }>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Value"><Input value={s.value} onChange={(e) => set(data.stats.map(x => x.id === s.id ? { ...x, value: e.target.value } : x))} /></Field>
            <Field label="Label"><Input value={s.label} onChange={(e) => set(data.stats.map(x => x.id === s.id ? { ...x, label: e.target.value } : x))} /></Field>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

/* ------------------------------ TESTIMONIALS ------------------------------ */
export function TestimonialsTab() {
  const { data, setData } = useCMS();
  const set = (testimonials: Testimonial[]) => setData((d) => ({ ...d, testimonials }));
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Btn variant="primary" onClick={() => set([...data.testimonials, { id: cmsUid(), name: "New", role: "Role", company: "Company", quote: "", photo: "", rating: 5 }])}>+ Add Testimonial</Btn>
      </div>
      {data.testimonials.map((t, i) => (
        <SectionCard key={t.id} title={t.name || "Untitled"} actions={
          <MoveControls
            onUp={() => set(move(data.testimonials, i, -1))}
            onDown={() => set(move(data.testimonials, i, 1))}
            onDelete={() => set(data.testimonials.filter(x => x.id !== t.id))}
          />
        }>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Name"><Input value={t.name} onChange={(e) => set(data.testimonials.map(x => x.id === t.id ? { ...x, name: e.target.value } : x))} /></Field>
            <Field label="Role"><Input value={t.role} onChange={(e) => set(data.testimonials.map(x => x.id === t.id ? { ...x, role: e.target.value } : x))} /></Field>
            <Field label="Company"><Input value={t.company} onChange={(e) => set(data.testimonials.map(x => x.id === t.id ? { ...x, company: e.target.value } : x))} /></Field>
            <Field label="Rating (1-5)"><Input type="number" min={1} max={5} value={t.rating} onChange={(e) => set(data.testimonials.map(x => x.id === t.id ? { ...x, rating: Number(e.target.value) } : x))} /></Field>
            <div className="md:col-span-2"><Field label="Quote"><Textarea value={t.quote} onChange={(e) => set(data.testimonials.map(x => x.id === t.id ? { ...x, quote: e.target.value } : x))} rows={4} /></Field></div>
            <div className="md:col-span-2"><Field label="Photo"><ImageUpload value={t.photo} onChange={(v) => set(data.testimonials.map(x => x.id === t.id ? { ...x, photo: v } : x))} /></Field></div>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

/* ------------------------------ PROCESS ------------------------------ */
export function ProcessTab() {
  const { data, setData } = useCMS();
  const set = (process: ProcessStep[]) => setData((d) => ({ ...d, process }));
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Btn variant="primary" onClick={() => set([...data.process, { id: cmsUid(), title: "New Step", description: "" }])}>+ Add Step</Btn>
      </div>
      {data.process.map((p, i) => (
        <SectionCard key={p.id} title={`Step ${i + 1}`} actions={
          <MoveControls
            onUp={() => set(move(data.process, i, -1))}
            onDown={() => set(move(data.process, i, 1))}
            onDelete={() => set(data.process.filter(x => x.id !== p.id))}
          />
        }>
          <div className="space-y-3">
            <Field label="Title"><Input value={p.title} onChange={(e) => set(data.process.map(x => x.id === p.id ? { ...x, title: e.target.value } : x))} /></Field>
            <Field label="Description"><Textarea value={p.description} onChange={(e) => set(data.process.map(x => x.id === p.id ? { ...x, description: e.target.value } : x))} /></Field>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

/* ------------------------------ TEAM ------------------------------ */
export function TeamTab() {
  const { data, setData } = useCMS();
  const set = (team: TeamMember[]) => setData((d) => ({ ...d, team }));
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Btn variant="primary" onClick={() => set([...data.team, { id: cmsUid(), name: "New Member", role: "Role", bio: "", photo: "" }])}>+ Add Member</Btn>
      </div>
      {data.team.map((m, i) => (
        <SectionCard key={m.id} title={m.name} actions={
          <MoveControls
            onUp={() => set(move(data.team, i, -1))}
            onDown={() => set(move(data.team, i, 1))}
            onDelete={() => set(data.team.filter(x => x.id !== m.id))}
          />
        }>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Name"><Input value={m.name} onChange={(e) => set(data.team.map(x => x.id === m.id ? { ...x, name: e.target.value } : x))} /></Field>
            <Field label="Role"><Input value={m.role} onChange={(e) => set(data.team.map(x => x.id === m.id ? { ...x, role: e.target.value } : x))} /></Field>
            <Field label="LinkedIn URL"><Input value={m.linkedin || ""} onChange={(e) => set(data.team.map(x => x.id === m.id ? { ...x, linkedin: e.target.value } : x))} /></Field>
            <Field label="Twitter URL"><Input value={m.twitter || ""} onChange={(e) => set(data.team.map(x => x.id === m.id ? { ...x, twitter: e.target.value } : x))} /></Field>
            <div className="md:col-span-2"><Field label="Bio"><Textarea value={m.bio} onChange={(e) => set(data.team.map(x => x.id === m.id ? { ...x, bio: e.target.value } : x))} /></Field></div>
            <div className="md:col-span-2"><Field label="Photo"><ImageUpload value={m.photo} onChange={(v) => set(data.team.map(x => x.id === m.id ? { ...x, photo: v } : x))} /></Field></div>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

/* ------------------------------ ABOUT ------------------------------ */
export function AboutTab() {
  const { data, setData } = useCMS();
  const a = data.about;
  const set = (patch: Partial<typeof a>) => setData((d) => ({ ...d, about: { ...d.about, ...patch } }));
  return (
    <SectionCard title="Company">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Tagline"><Input value={a.tagline} onChange={(e) => set({ tagline: e.target.value })} /></Field>
        <Field label="Founded year"><Input value={a.founded} onChange={(e) => set({ founded: e.target.value })} /></Field>
        <Field label="Headquarters"><Input value={a.headquarters} onChange={(e) => set({ headquarters: e.target.value })} /></Field>
        <Field label="Mission"><Input value={a.mission} onChange={(e) => set({ mission: e.target.value })} /></Field>
        <div className="md:col-span-2"><Field label="Story"><Textarea value={a.story} onChange={(e) => set({ story: e.target.value })} rows={8} /></Field></div>
      </div>
    </SectionCard>
  );
}

/* ------------------------------ CONTACT ------------------------------ */
export function ContactTab() {
  const { data, setData } = useCMS();
  const c = data.contact;
  const set = (patch: Partial<typeof c>) => setData((d) => ({ ...d, contact: { ...d.contact, ...patch } }));
  const setSocial = (k: keyof typeof c.socials, v: string) => set({ socials: { ...c.socials, [k]: v } });
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <SectionCard title="Contact Info">
        <div className="space-y-4">
          <Field label="Email"><Input value={c.email} onChange={(e) => set({ email: e.target.value })} /></Field>
          <Field label="Phone"><Input value={c.phone} onChange={(e) => set({ phone: e.target.value })} /></Field>
          <Field label="Address"><Textarea value={c.address} onChange={(e) => set({ address: e.target.value })} /></Field>
        </div>
      </SectionCard>
      <SectionCard title="Socials">
        <div className="space-y-4">
          {(Object.keys(c.socials) as Array<keyof typeof c.socials>).map((k) => (
            <Field key={k} label={k}><Input value={c.socials[k]} onChange={(e) => setSocial(k, e.target.value)} /></Field>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* ------------------------------ SEO ------------------------------ */
export function SeoTab() {
  const { data, setData } = useCMS();
  const s = data.seo;
  const set = (patch: Partial<typeof s>) => setData((d) => ({ ...d, seo: { ...d.seo, ...patch } }));
  return (
    <SectionCard title="SEO & Meta">
      <div className="space-y-4">
        <Field label="Site Title"><Input value={s.title} onChange={(e) => set({ title: e.target.value })} /></Field>
        <Field label="Meta Description"><Textarea value={s.description} onChange={(e) => set({ description: e.target.value })} /></Field>
        <Field label="Keywords"><Input value={s.keywords} onChange={(e) => set({ keywords: e.target.value })} /></Field>
        <Field label="OG Image"><ImageUpload value={s.ogImage} onChange={(v) => set({ ogImage: v })} /></Field>
      </div>
    </SectionCard>
  );
}

/* ------------------------------ GLOBAL ------------------------------ */
export function GlobalTab() {
  const { data, setData } = useCMS();
  const g = data.global;
  const set = (patch: Partial<typeof g>) => setData((d) => ({ ...d, global: { ...d.global, ...patch } }));
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SectionCard title="Identity">
          <div className="space-y-4">
            <Field label="Site Name"><Input value={g.siteName} onChange={(e) => set({ siteName: e.target.value })} /></Field>
            <Field label="Logo (fallback)"><ImageUpload value={g.logo} onChange={(v) => set({ logo: v })} /></Field>
            <Field label="Header Logo"><ImageUpload value={g.headerLogo} onChange={(v) => set({ headerLogo: v })} /></Field>
            <Field label="Footer Logo"><ImageUpload value={g.footerLogo} onChange={(v) => set({ footerLogo: v })} /></Field>
            <Field label="Favicon"><ImageUpload value={g.favicon} onChange={(v) => set({ favicon: v })} /></Field>
            <Field label="Accent Color"><Input type="color" value={g.accent} onChange={(e) => set({ accent: e.target.value })} /></Field>
            <Field label="Footer copyright"><Input value={g.footerCopy} onChange={(e) => set({ footerCopy: e.target.value })} /></Field>
            <Field label="Google Analytics ID"><Input value={g.gaId} onChange={(e) => set({ gaId: e.target.value })} placeholder="G-XXXXXXX" /></Field>
          </div>
        </SectionCard>
        <SectionCard title="Announcement Bar">
          <div className="space-y-4">
            <label className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
              <input type="checkbox" checked={g.announcement.enabled} onChange={(e) => set({ announcement: { ...g.announcement, enabled: e.target.checked } })} />
              Show announcement bar
            </label>
            <Field label="Text"><Input value={g.announcement.text} onChange={(e) => set({ announcement: { ...g.announcement, text: e.target.value } })} /></Field>
            <Field label="Link"><Input value={g.announcement.link} onChange={(e) => set({ announcement: { ...g.announcement, link: e.target.value } })} /></Field>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Live Logo Preview">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Header Context</div>
            <div className="flex items-center gap-3 rounded border border-border bg-background px-4 py-3">
              {(g.headerLogo || g.logo) ? (
                <img
                  src={g.headerLogo || g.logo}
                  alt={g.siteName}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="h-8 w-auto object-contain"
                />
              ) : null}
              <span className="font-display text-2xl font-bold tracking-tight">
                {g.siteName.split(" ").map((w, i, arr) => (
                  <span key={i} className="inline-block">{w}{i < arr.length - 1 ? "\u00A0" : ""}</span>
                ))}
                <span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
              </span>
            </div>
          </div>
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Footer Context</div>
            <div className="rounded border border-border bg-background px-4 py-5">
              {(g.footerLogo || g.logo) ? (
                <img
                  src={g.footerLogo || g.logo}
                  alt={g.siteName}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="h-16 w-auto object-contain"
                />
              ) : null}
              <div className="font-display text-5xl font-bold tracking-tight">
                {g.siteName}<span className="text-neon" style={{ color: "var(--color-neon)" }}>.</span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

/* ------------------------------ MEDIA LIBRARY ------------------------------ */
export function MediaTab() {
  const { data, setData } = useCMS();
  const [preview, setPreview] = useState<string | null>(null);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((f) => {
      const r = new FileReader();
      r.onload = () => {
        const url = String(r.result || "");
        setData((d) => ({
          ...d,
          media: [...d.media, { id: cmsUid(), url, name: f.name, type: f.type.startsWith("video/") ? "video" : "image", createdAt: Date.now() }],
        }));
      };
      r.readAsDataURL(f);
    });
  };

  return (
    <div className="space-y-4">
      <SectionCard title={`Media Library (${data.media.length})`} actions={
        <label className="cursor-pointer border border-neon px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-neon" style={{ borderColor: "var(--color-neon)", color: "var(--color-neon)" }}>
          + Upload
          <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={onUpload} />
        </label>
      }>
        {data.media.length === 0 ? (
          <p className="text-sm text-muted-foreground">No media yet. Upload some.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {data.media.map((m) => (
              <div key={m.id} className="group relative aspect-square overflow-hidden border border-border bg-background">
                {m.type === "image"
                  ? <img src={m.url} alt={m.name} className="h-full w-full object-cover" onClick={() => setPreview(m.url)} />
                  : <video src={m.url} className="h-full w-full object-cover" muted />}
                <div className="absolute inset-0 flex flex-col items-stretch justify-between bg-background/80 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="truncate font-mono text-[9px] tracking-wider text-muted-foreground">{m.name}</span>
                  <div className="flex gap-1">
                    <Btn variant="ghost" onClick={() => { navigator.clipboard.writeText(m.url); }}>copy</Btn>
                    <Btn variant="danger" onClick={() => setData((d) => ({ ...d, media: d.media.filter(x => x.id !== m.id) }))}>x</Btn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-8" onClick={() => setPreview(null)}>
          <img src={preview} className="max-h-full max-w-full" alt="" />
        </div>
      )}
    </div>
  );
}

/* ------------------------------ HEADER ------------------------------ */
export function HeaderTab() {
  const { data, setData } = useCMS();
  const h = data.header;
  const set = (patch: Partial<typeof h>) => setData((d) => ({ ...d, header: { ...d.header, ...patch } }));
  return (
    <div className="space-y-6">
      <SectionCard title="Nav Links" actions={
        <Btn variant="primary" onClick={() => set({ navLinks: [...h.navLinks, { id: cmsUid(), label: "New", href: "/" }] })}>+ Add Link</Btn>
      }>
        <div className="space-y-3">
          {h.navLinks.map((n, i) => (
            <div key={n.id} className="grid grid-cols-[1fr_1fr_auto] gap-3">
              <Input value={n.label} placeholder="Label" onChange={(e) => set({ navLinks: h.navLinks.map(x => x.id === n.id ? { ...x, label: e.target.value } : x) })} />
              <Input value={n.href} placeholder="/path" onChange={(e) => set({ navLinks: h.navLinks.map(x => x.id === n.id ? { ...x, href: e.target.value } : x) })} />
              <MoveControls
                onUp={() => set({ navLinks: move(h.navLinks, i, -1) })}
                onDown={() => set({ navLinks: move(h.navLinks, i, 1) })}
                onDelete={() => set({ navLinks: h.navLinks.filter(x => x.id !== n.id) })}
              />
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Header CTA">
        <div className="grid grid-cols-2 gap-4">
          <Field label="CTA Label"><Input value={h.ctaLabel} onChange={(e) => set({ ctaLabel: e.target.value })} /></Field>
          <Field label="CTA Link"><Input value={h.ctaLink} onChange={(e) => set({ ctaLink: e.target.value })} /></Field>
        </div>
      </SectionCard>
    </div>
  );
}

/* ------------------------------ FOOTER ------------------------------ */
export function FooterTab() {
  const { data, setData } = useCMS();
  const f = data.footer;
  const set = (patch: Partial<typeof f>) => setData((d) => ({ ...d, footer: { ...d.footer, ...patch } }));
  return (
    <div className="space-y-6">
      <SectionCard title="Big Headline & CTA">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Line 1"><Input value={f.bigLine1} onChange={(e) => set({ bigLine1: e.target.value })} /></Field>
          <Field label="Line 2 (italic / neon)"><Input value={f.bigLine2} onChange={(e) => set({ bigLine2: e.target.value })} /></Field>
          <Field label="CTA Label"><Input value={f.bigCtaLabel} onChange={(e) => set({ bigCtaLabel: e.target.value })} /></Field>
          <Field label="CTA Link"><Input value={f.bigCtaLink} onChange={(e) => set({ bigCtaLink: e.target.value })} /></Field>
        </div>
      </SectionCard>

      <SectionCard title="Marquee Words (one per line)">
        <Textarea
          rows={6}
          value={f.marqueeWords.join("\n")}
          onChange={(e) => set({ marqueeWords: e.target.value.split("\n").filter(Boolean) })}
        />
      </SectionCard>

      <SectionCard title="Link Columns" actions={
        <Btn variant="primary" onClick={() => set({ columns: [...f.columns, { id: cmsUid(), title: "New", links: [] }] })}>+ Add Column</Btn>
      }>
        <div className="space-y-5">
          {f.columns.map((col, ci) => (
            <div key={col.id} className="border border-border p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <Input value={col.title} placeholder="Column title" onChange={(e) => set({ columns: f.columns.map(x => x.id === col.id ? { ...x, title: e.target.value } : x) })} />
                <MoveControls
                  onUp={() => set({ columns: move(f.columns, ci, -1) })}
                  onDown={() => set({ columns: move(f.columns, ci, 1) })}
                  onDelete={() => { if (confirm("Delete column?")) set({ columns: f.columns.filter(x => x.id !== col.id) }); }}
                />
              </div>
              <div className="space-y-2">
                {col.links.map((l, li) => (
                  <div key={l.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <Input value={l.label} placeholder="Label" onChange={(e) => set({ columns: f.columns.map(x => x.id === col.id ? { ...x, links: x.links.map(y => y.id === l.id ? { ...y, label: e.target.value } : y) } : x) })} />
                    <Input value={l.href} placeholder="/path" onChange={(e) => set({ columns: f.columns.map(x => x.id === col.id ? { ...x, links: x.links.map(y => y.id === l.id ? { ...y, href: e.target.value } : y) } : x) })} />
                    <MoveControls
                      onUp={() => set({ columns: f.columns.map(x => x.id === col.id ? { ...x, links: move(x.links, li, -1) } : x) })}
                      onDown={() => set({ columns: f.columns.map(x => x.id === col.id ? { ...x, links: move(x.links, li, 1) } : x) })}
                      onDelete={() => set({ columns: f.columns.map(x => x.id === col.id ? { ...x, links: x.links.filter(y => y.id !== l.id) } : x) })}
                    />
                  </div>
                ))}
                <Btn onClick={() => set({ columns: f.columns.map(x => x.id === col.id ? { ...x, links: [...x.links, { id: cmsUid(), label: "Link", href: "/" }] } : x) })}>+ Add Link</Btn>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* ------------------------------ SUBMISSIONS ------------------------------ */
export function SubmissionsTab() {
  const { data, setData } = useCMS();
  const [open, setOpen] = useState<string | null>(null);
  const submissions = [...(data.submissions || [])].sort((a, b) => b.createdAt - a.createdAt);
  const unread = submissions.filter((s) => !s.read).length;

  const setSubs = (next: Submission[]) => setData((d) => ({ ...d, submissions: next }));

  const markRead = (id: string, read = true) =>
    setSubs(submissions.map((s) => (s.id === id ? { ...s, read } : s)));

  const remove = (id: string) => {
    if (!confirm("Delete this submission?")) return;
    setSubs(submissions.filter((s) => s.id !== id));
    if (open === id) setOpen(null);
  };

  const clearAll = () => {
    if (!confirm("Delete ALL submissions? This cannot be undone.")) return;
    setSubs([]);
    setOpen(null);
  };

  const exportCsv = () => {
    const headers = ["Date", "Name", "Email", "Company", "Service", "Budget", "Message"];
    const rows = submissions.map((s) => [
      new Date(s.createdAt).toISOString(),
      s.name, s.email, s.company, s.service, s.budget,
      s.message.replace(/\r?\n/g, " "),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <SectionCard
        title={`Contact Form Submissions (${submissions.length}${unread ? ` · ${unread} unread` : ""})`}
        actions={
          <div className="flex gap-2">
            <Btn onClick={exportCsv} disabled={!submissions.length}>Export CSV</Btn>
            <Btn variant="danger" onClick={clearAll} disabled={!submissions.length}>Clear All</Btn>
          </div>
        }
      >
        {submissions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No submissions yet. Messages from the contact form will appear here.</p>
        ) : (
          <div className="divide-y divide-border border border-border">
            {submissions.map((s) => {
              const isOpen = open === s.id;
              return (
                <div key={s.id} className={`${!s.read ? "bg-elevated/40" : ""}`} style={!s.read ? { background: "color-mix(in oklab, var(--color-neon) 6%, transparent)" } : undefined}>
                  <button
                    onClick={() => { setOpen(isOpen ? null : s.id); if (!s.read) markRead(s.id, true); }}
                    className="grid w-full grid-cols-[auto_1.2fr_1.5fr_1fr_auto] items-center gap-3 px-4 py-3 text-left hover:bg-background/60"
                  >
                    <span className={`h-2 w-2 rounded-full ${s.read ? "bg-muted-foreground/40" : "bg-neon"}`} style={!s.read ? { background: "var(--color-neon)" } : undefined} />
                    <span className="truncate text-sm font-medium">{s.name || "—"}</span>
                    <span className="truncate text-sm text-muted-foreground">{s.email}</span>
                    <span className="truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.service} · {s.budget}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {new Date(s.createdAt).toLocaleDateString()} {new Date(s.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="space-y-4 border-t border-border bg-background px-4 py-5">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <Meta label="Name" value={s.name} />
                        <Meta label="Email" value={<a href={`mailto:${s.email}`} className="hover:text-neon" style={{}}>{s.email}</a>} />
                        <Meta label="Company" value={s.company || "—"} />
                        <Meta label="Service" value={s.service} />
                        <Meta label="Budget" value={s.budget} />
                        <Meta label="Received" value={new Date(s.createdAt).toLocaleString()} />
                      </div>
                      <div>
                        <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Message</div>
                        <div className="whitespace-pre-wrap border border-border bg-background p-4 text-sm">{s.message}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Btn onClick={() => window.open(`mailto:${s.email}?subject=Re: your enquiry`)}>Reply via Email</Btn>
                        <Btn onClick={() => markRead(s.id, !s.read)}>{s.read ? "Mark unread" : "Mark read"}</Btn>
                        <Btn variant="danger" onClick={() => remove(s.id)}>Delete</Btn>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}

export const tabRegistry: { id: string; label: string; render: () => ReactNode }[] = [
  { id: "hero", label: "Hero", render: () => <HeroTab /> },
  { id: "header", label: "Header", render: () => <HeaderTab /> },
  { id: "footer", label: "Footer", render: () => <FooterTab /> },
  { id: "services", label: "Services", render: () => <ServicesTab /> },
  { id: "portfolio", label: "Portfolio", render: () => <PortfolioTab /> },
  { id: "stats", label: "Stats", render: () => <StatsTab /> },
  { id: "testimonials", label: "Testimonials", render: () => <TestimonialsTab /> },
  { id: "process", label: "Process", render: () => <ProcessTab /> },
  { id: "team", label: "Team", render: () => <TeamTab /> },
  { id: "about", label: "About", render: () => <AboutTab /> },
  { id: "contact", label: "Contact", render: () => <ContactTab /> },
  { id: "submissions", label: "Submissions", render: () => <SubmissionsTab /> },
  { id: "seo", label: "SEO & Meta", render: () => <SeoTab /> },
  { id: "global", label: "Global", render: () => <GlobalTab /> },
  { id: "media", label: "Media Library", render: () => <MediaTab /> },
];
