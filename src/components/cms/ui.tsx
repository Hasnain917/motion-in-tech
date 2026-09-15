import type { ChangeEvent, ReactNode } from "react";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      {children}
      {hint && <div className="mt-1 text-xs text-muted-foreground/70">{hint}</div>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-neon ${props.className ?? ""}`}
      style={{ ...(props.style as object) }}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-neon ${props.className ?? ""}`}
      rows={props.rows ?? 3}
    />
  );
}

export function Btn({ children, variant = "default", ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "primary" | "ghost" | "danger" }) {
  const v = {
    default: "border border-border hover:border-foreground",
    primary: "border border-neon bg-neon text-background hover:bg-transparent hover:text-neon",
    ghost: "border border-transparent text-muted-foreground hover:text-foreground",
    danger: "border border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground",
  }[variant];
  return (
    <button {...rest} className={`inline-flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${v} ${rest.className ?? ""}`}>
      {children}
    </button>
  );
}

export function ImageUpload({ value, onChange, label = "Image" }: { value: string; onChange: (v: string) => void; label?: string }) {
  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.readAsDataURL(f);
  };
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-16 w-24 items-center justify-center border border-border bg-background text-xs text-muted-foreground">
        {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : "none"}
      </div>
      <label className="cursor-pointer border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-foreground">
        Change {label}
        <input type="file" accept="image/*" className="hidden" onChange={onFile} />
      </label>
      {value && <Btn variant="ghost" onClick={() => onChange("")}>Remove</Btn>}
    </div>
  );
}

export function MoveControls({ onUp, onDown, onDelete }: { onUp: () => void; onDown: () => void; onDelete: () => void }) {
  return (
    <div className="flex gap-1">
      <Btn variant="ghost" onClick={onUp}>↑</Btn>
      <Btn variant="ghost" onClick={onDown}>↓</Btn>
      <Btn variant="danger" onClick={onDelete}>Delete</Btn>
    </div>
  );
}

export function SectionCard({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="border border-border bg-elevated p-6" style={{ background: "var(--color-elevated)" }}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg">{title}</h3>
        {actions}
      </div>
      {children}
    </div>
  );
}

export function move<T>(arr: T[], from: number, dir: -1 | 1): T[] {
  const to = from + dir;
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}
