import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCMS, cmsUid } from "@/context/CMSContext";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Motion In Tech" },
      { name: "description", content: "Start a project with Motion In Tech. We work with ambitious teams across fintech, mobility, commerce and beyond." },
      { property: "og:title", content: "Contact — Motion In Tech" },
      { property: "og:description", content: "Let's build something iconic." },
    ],
  }),
  component: ContactPage,
});

const budgets = ["< $25k", "$25k – $75k", "$75k – $200k", "$200k+"];
const services = ["Web", "Mobile", "Design", "ERP", "Consulting"];

function ContactPage() {
  const { data, setData } = useCMS();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: budgets[1], service: services[0], message: "" });

  return (
    <main>
      <PageHero
        eyebrow="07 — Contact"
        title="Let's build"
        accent="iconic."
        subtitle="Tell us about your project. We reply within one business day with next steps or a friendly no."
      />

      <section className="relative bg-background pb-32">
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
          <aside className="md:col-span-4 md:row-start-1">
            <div className="space-y-10">
              <div className="border-t border-border pt-6">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Email</div>
                <a
                  href={`mailto:${data.contact.email}`}
                  data-cursor="hover"
                  className="mt-2 block font-display text-2xl hover:text-neon"
                  style={{}}
                >
                  {data.contact.email}
                </a>
              </div>
              <div className="border-t border-border pt-6">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Phone</div>
                <div className="mt-2 font-display text-2xl">{data.contact.phone}</div>
              </div>
              <div className="border-t border-border pt-6">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Studio</div>
                <div className="mt-2 max-w-xs font-display text-xl">{data.contact.address}</div>
              </div>
              <div className="border-t border-border pt-6">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Elsewhere</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(data.contact.socials).map(([k, v]) =>
                    v ? (
                      <a
                        key={k}
                        href={v}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="hover"
                        className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest hover:border-neon hover:text-neon"
                      >
                        {k}
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </aside>

          <div className="md:col-span-7 md:col-start-6">
            {submitted ? (
              <div className="border border-neon/40 p-10 text-center" style={{ borderColor: "color-mix(in oklab, var(--color-neon) 40%, transparent)" }}>
                <div className="font-mono text-[11px] uppercase tracking-widest text-neon" style={{ color: "var(--color-neon)" }}>
                  Message sent
                </div>
                <h3 className="mt-3 font-display text-3xl font-bold">Thanks, {form.name.split(" ")[0] || "friend"}.</h3>
                <p className="mt-3 text-muted-foreground">We&apos;ll be in touch within one business day.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setData((d) => ({
                    ...d,
                    submissions: [
                      ...(d.submissions || []),
                      {
                        id: cmsUid(),
                        name: form.name,
                        email: form.email,
                        company: form.company,
                        service: form.service,
                        budget: form.budget,
                        message: form.message,
                        createdAt: Date.now(),
                        read: false,
                      },
                    ],
                  }));
                  setSubmitted(true);
                }}
                className="space-y-8"
              >
                <Field label="Your name" required>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border-b border-border bg-transparent py-3 font-display text-2xl outline-none focus:border-neon"
                  />
                </Field>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border-b border-border bg-transparent py-3 font-display text-xl outline-none focus:border-neon"
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full border-b border-border bg-transparent py-3 font-display text-xl outline-none focus:border-neon"
                    />
                  </Field>
                </div>

                <Field label="What do you need?">
                  <div className="flex flex-wrap gap-2 pt-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, service: s })}
                        className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-widest ${
                          form.service === s ? "border-neon text-neon" : "border-border text-muted-foreground hover:border-foreground/40"
                        }`}
                        style={form.service === s ? { borderColor: "var(--color-neon)", color: "var(--color-neon)" } : undefined}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Budget">
                  <div className="flex flex-wrap gap-2 pt-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm({ ...form, budget: b })}
                        className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-widest ${
                          form.budget === b ? "border-neon text-neon" : "border-border text-muted-foreground hover:border-foreground/40"
                        }`}
                        style={form.budget === b ? { borderColor: "var(--color-neon)", color: "var(--color-neon)" } : undefined}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Tell us about the project" required>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none border-b border-border bg-transparent py-3 font-display text-xl outline-none focus:border-neon"
                  />
                </Field>

                <button
                  type="submit"
                  data-cursor="hover"
                  className="inline-flex items-center gap-3 border border-neon px-8 py-5 font-mono text-xs uppercase tracking-widest text-neon transition-colors hover:bg-neon hover:text-background"
                  style={{ borderColor: "var(--color-neon)", color: "var(--color-neon)" }}
                >
                  Send message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label} {required && <span style={{ color: "var(--color-neon)" }}>*</span>}
      </div>
      {children}
    </label>
  );
}
