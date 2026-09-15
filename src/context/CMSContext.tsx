import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import heroVideoAsset from "@/assets/hero-bg.mp4.asset.json";
import projectHelios from "@/assets/project-helios.jpg";
import projectOrbit from "@/assets/project-orbit.jpg";
import projectNova from "@/assets/project-nova.jpg";
import projectAtlas from "@/assets/project-atlas.jpg";
import projectVector from "@/assets/project-vector.jpg";
import projectPulse from "@/assets/project-pulse.jpg";
import teamAris from "@/assets/team-aris.jpg";
import teamLina from "@/assets/team-lina.jpg";
import teamMarcus from "@/assets/team-marcus.jpg";

export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  subServices: string[];
  technologies: string[];
  visible: boolean;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string; // url or base64
  visible: boolean;
};

export type Stat = { id: string; value: string; label: string };
export type Testimonial = { id: string; name: string; role: string; company: string; quote: string; photo: string; rating: number };
export type ProcessStep = { id: string; title: string; description: string };
export type TeamMember = { id: string; name: string; role: string; bio: string; photo: string; linkedin?: string; twitter?: string };
export type MediaItem = { id: string; url: string; name: string; type: "image" | "video"; createdAt: number };
export type Submission = {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  createdAt: number;
  read: boolean;
};

export type CMSData = {
  hero: {
    headline: string;
    subHeadline: string;
    cta1: { label: string; link: string };
    cta2: { label: string; link: string };
    backgroundType: "video" | "image";
    backgroundVideo: string;
    backgroundImage: string;
    marquee: string[];
  };
  services: Service[];
  projects: Project[];
  stats: Stat[];
  animateCounters: boolean;
  testimonials: Testimonial[];
  process: ProcessStep[];
  team: TeamMember[];
  about: {
    tagline: string;
    story: string;
    founded: string;
    headquarters: string;
    mission: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    socials: { linkedin: string; twitter: string; instagram: string; github: string; behance: string };
  };
  seo: { title: string; description: string; ogImage: string; keywords: string };
  global: {
    logo: string;
    headerLogo: string;
    footerLogo: string;
    siteName: string;
    accent: string;
    footerCopy: string;
    announcement: { enabled: boolean; text: string; link: string };
    favicon: string;
    gaId: string;
  };
  header: {
    navLinks: { id: string; label: string; href: string }[];
    ctaLabel: string;
    ctaLink: string;
  };
  footer: {
    bigLine1: string;
    bigLine2: string;
    bigCtaLabel: string;
    bigCtaLink: string;
    marqueeWords: string[];
    columns: { id: string; title: string; links: { id: string; label: string; href: string }[] }[];
  };
  media: MediaItem[];
  submissions: Submission[];
};

const uid = () => Math.random().toString(36).slice(2, 10);

const defaultData: CMSData = {
  hero: {
    headline: "We Build Digital Futures.",
    subHeadline: "Motion In Tech — Where Code Meets Craft.",
    cta1: { label: "See Our Work", link: "#work" },
    cta2: { label: "Get In Touch", link: "#contact" },
    backgroundType: "video",
    backgroundVideo: heroVideoAsset.url,
    backgroundImage: "",
    marquee: [
      "Web Development",
      "Mobile Apps",
      "UI / UX Design",
      "ERP Systems",
      "IT Consulting",
      "Cloud Architecture",
      "AI Engineering",
    ],
  },
  services: [
    {
      id: uid(),
      icon: "Globe",
      title: "Web Development",
      description: "Production-grade web platforms engineered to scale. From bespoke React apps to enterprise commerce stacks.",
      subServices: ["Frontend (React / Vue)", "Backend (Node / Python)", "E-Commerce (Shopify / Woo)", "Headless CMS", "Performance & SEO", "Maintenance"],
      technologies: ["React", "Next.js", "Node", "PostgreSQL", "GraphQL"],
      visible: true,
    },
    {
      id: uid(),
      icon: "Smartphone",
      title: "Mobile App Development",
      description: "Native and cross-platform apps with cinematic UI and rock-solid architecture.",
      subServices: ["Android (Kotlin)", "iOS (Swift)", "Flutter / React Native", "Mobile UI/UX", "Backend Integration", "Post-Launch Support"],
      technologies: ["Swift", "Kotlin", "Flutter", "React Native"],
      visible: true,
    },
    {
      id: uid(),
      icon: "Palette",
      title: "UI / UX Design",
      description: "Design systems and product interfaces engineered for clarity, delight and conversion.",
      subServices: ["User Research", "Wireframing", "Prototyping (Figma)", "Design Systems", "Usability Testing", "WCAG Accessibility"],
      technologies: ["Figma", "Framer", "Principle"],
      visible: true,
    },
    {
      id: uid(),
      icon: "Building2",
      title: "ERP & Custom Software",
      description: "End-to-end business platforms — ERP, CRM, internal tools, integrations and workflow automation.",
      subServices: ["ERP (SAP / Oracle / Odoo)", "CRM (Salesforce / HubSpot)", "Custom Business Tools", "API Integration", "Database Design", "Workflow Automation"],
      technologies: ["Odoo", "SAP", "Salesforce", "Postgres"],
      visible: true,
    },
    {
      id: uid(),
      icon: "Briefcase",
      title: "IT Consulting",
      description: "Senior consultants embedded with your team. Strategy, architecture, audits and team augmentation.",
      subServices: ["Digital Transformation", "Technology Roadmap", "Tech Stack Selection", "Team Augmentation", "Security Audits", "Cloud Strategy"],
      technologies: ["AWS", "GCP", "Azure", "Kubernetes"],
      visible: true,
    },
  ],
  projects: [
    { id: uid(), title: "Helios Banking", category: "Web", description: "Reimagined private banking experience for a tier-1 European bank.", tags: ["Fintech", "React", "Design System"], image: projectHelios, visible: true },
    { id: uid(), title: "Orbit Mobility", category: "Mobile", description: "Cross-platform ride-hailing app shipped in 14 weeks.", tags: ["Flutter", "Realtime"], image: projectOrbit, visible: true },
    { id: uid(), title: "Nova Studios", category: "Design", description: "Brand and product OS for an LA-based creative studio.", tags: ["Brand", "Figma"], image: projectNova, visible: true },
    { id: uid(), title: "Atlas ERP", category: "ERP", description: "Custom ERP replacing 7 legacy systems for a logistics group.", tags: ["Odoo", "Integration"], image: projectAtlas, visible: true },
    { id: uid(), title: "Vector Commerce", category: "Web", description: "Headless commerce platform doing $40M+ ARR.", tags: ["Next.js", "Shopify"], image: projectVector, visible: true },
    { id: uid(), title: "Pulse Health", category: "Mobile", description: "HIPAA-compliant telehealth platform for 200k+ patients.", tags: ["iOS", "Android"], image: projectPulse, visible: true },
  ],
  stats: [
    { id: uid(), value: "150", label: "Projects Delivered" },
    { id: uid(), value: "8", label: "Years of Craft" },
    { id: uid(), value: "40", label: "Engineers & Designers" },
    { id: uid(), value: "98", label: "Client Satisfaction %" },
  ],
  animateCounters: true,
  testimonials: [
    { id: uid(), name: "Elena Marsh", role: "VP Product", company: "Helios Bank", quote: "Motion In Tech delivered a product that genuinely changed how our customers feel about banking. Cinematic, fast and rigorously engineered.", photo: "https://i.pravatar.cc/200?img=47", rating: 5 },
    { id: uid(), name: "Daniel Okafor", role: "CTO", company: "Orbit Mobility", quote: "The most senior engineering team we've ever worked with. They ship.", photo: "https://i.pravatar.cc/200?img=12", rating: 5 },
    { id: uid(), name: "Mira Tanaka", role: "Founder", company: "Nova Studios", quote: "Every detail considered. Every interaction intentional. Award-tier work.", photo: "https://i.pravatar.cc/200?img=32", rating: 5 },
  ],
  process: [
    { id: uid(), title: "Discovery", description: "We immerse in your business, users and constraints — and challenge the brief." },
    { id: uid(), title: "Strategy", description: "Roadmaps, architecture decisions and a measurable definition of done." },
    { id: uid(), title: "Design", description: "Design systems and prototypes that are already production-aware." },
    { id: uid(), title: "Development", description: "Senior engineers, weekly releases, ruthless code quality." },
    { id: uid(), title: "Launch", description: "Performance, security and SEO hardened. Zero-downtime rollouts." },
    { id: uid(), title: "Support", description: "We stay embedded — monitoring, iterating, evolving with your business." },
  ],
  team: [
    { id: uid(), name: "Aris Vahn", role: "Founder & CEO", bio: "Ex-IDEO, 12 years building digital products at scale.", photo: teamAris },
    { id: uid(), name: "Lina Park", role: "Design Director", bio: "Brand systems and product design for global teams.", photo: teamLina },
    { id: uid(), name: "Marcus Reid", role: "Engineering Lead", bio: "Distributed systems, performance, architecture.", photo: teamMarcus },
  ],
  about: {
    tagline: "A studio engineered like a product.",
    story: "Founded in 2017 in Berlin, Motion In Tech began as a small collective of designers and engineers obsessed with how digital products feel. Today we are a 40-person studio building software for ambitious teams across fintech, mobility and consumer.",
    founded: "2017",
    headquarters: "Berlin · Lisbon · New York",
    mission: "Make the most important digital products on earth feel inevitable.",
  },
  contact: {
    email: "hello@motionintech.com",
    phone: "+49 30 1234 5678",
    address: "Torstraße 110, 10119 Berlin, Germany",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      github: "https://github.com",
      behance: "https://behance.net",
    },
  },
  seo: {
    title: "Motion In Tech — Award-winning Software Studio",
    description: "We design and engineer iconic digital products for ambitious teams. Web, mobile, ERP and design.",
    ogImage: "",
    keywords: "software agency, web development, mobile apps, UI UX, ERP, IT consulting",
  },
  global: {
    logo: "/__l5e/assets-v1/1700d437-881b-40ee-9d0f-f8f4c3164ffe/brand-logo-v3.png",
    headerLogo: "/__l5e/assets-v1/1700d437-881b-40ee-9d0f-f8f4c3164ffe/brand-logo-v3.png",
    footerLogo: "/__l5e/assets-v1/1700d437-881b-40ee-9d0f-f8f4c3164ffe/brand-logo-v3.png",
    siteName: "Motion In Tech",
    accent: "#00FFD1",
    footerCopy: "© 2025 Motion In Tech. All rights reserved.",
    announcement: { enabled: false, text: "We're hiring senior engineers — join us.", link: "/contact" },
    favicon: "",
    gaId: "",
  },
  header: {
    navLinks: [
      { id: uid(), label: "Work", href: "/work" },
      { id: uid(), label: "Services", href: "/services" },
      { id: uid(), label: "About", href: "/about" },
      { id: uid(), label: "Contact", href: "/contact" },
    ],
    ctaLabel: "Start a project",
    ctaLink: "/contact",
  },
  footer: {
    bigLine1: "LET'S",
    bigLine2: "build.",
    bigCtaLabel: "Start a project",
    bigCtaLink: "/contact",
    marqueeWords: ["MOTION", "IN", "TECH", "SHIP", "CRAFT"],
    columns: [
      { id: uid(), title: "Company", links: [
        { id: uid(), label: "About", href: "/about" },
        { id: uid(), label: "Work", href: "/work" },
        { id: uid(), label: "Services", href: "/services" },
        { id: uid(), label: "Contact", href: "/contact" },
      ]},
    ],
  },
  media: [],
  submissions: [],
};

type CMSContextValue = {
  data: CMSData;
  setData: (next: CMSData | ((prev: CMSData) => CMSData)) => void;
  update: <K extends keyof CMSData>(key: K, value: CMSData[K]) => void;
  reset: () => void;
  exportJson: () => void;
  importJson: (file: File) => Promise<void>;
  saved: boolean;
};

const CMSContext = createContext<CMSContextValue | null>(null);

const STORAGE_KEY = "mit-cms-v1";

export function CMSProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<CMSData>(defaultData);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setDataState({
          ...defaultData,
          ...parsed,
          global: { ...defaultData.global, ...(parsed.global ?? {}) },
        });
      }
    } catch {}
    setHydrated(true);
  }, []);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !hydrated) return;
    setSaved(false);
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSaved(true);
      } catch {}
    }, 300);
    return () => clearTimeout(t);
  }, [data, hydrated]);

  const setData: CMSContextValue["setData"] = (next) => {
    setDataState((prev) => (typeof next === "function" ? (next as (p: CMSData) => CMSData)(prev) : next));
  };

  const update: CMSContextValue["update"] = (key, value) =>
    setDataState((prev) => ({ ...prev, [key]: value }));

  const reset = () => setDataState(defaultData);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `motion-in-tech-cms-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    const text = await file.text();
    const parsed = JSON.parse(text);
    setDataState({ ...defaultData, ...parsed });
  };

  return (
    <CMSContext.Provider value={{ data, setData, update, reset, exportJson, importJson, saved }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error("useCMS must be used inside CMSProvider");
  return ctx;
}

export { uid as cmsUid };
