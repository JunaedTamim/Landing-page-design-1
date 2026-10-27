export type PlanId = "standard" | "complete";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price: number; // BDT
  compareAt?: number;
  features: string[];
}

export const PLANS: Record<PlanId, Plan> = {
  standard: {
    id: "standard",
    name: "The Toolkit",
    tagline: "Every document you need to run client work.",
    price: 10900,
    compareAt: 15900,
    features: [
      "12 battle-tested templates",
      "Client contract (designer-friendly, lawyer-reviewed)",
      "Proposal & pricing frameworks",
      "Onboarding + offboarding flows",
      "Notion, Google Docs & Word formats",
      "Lifetime updates included",
    ],
  },
  complete: {
    id: "complete",
    name: "Toolkit + Masterclass",
    tagline: "The documents, plus how to actually use them.",
    price: 17900,
    compareAt: 25900,
    features: [
      "Everything in The Toolkit",
      "3.5-hour video masterclass",
      "Negotiation scripts & email swipe files",
      "Client portal template (Notion)",
      "Rate calculator spreadsheet",
      "Private community access",
    ],
  },
};

export const COUPONS: Record<string, number> = {
  STUDIO20: 0.2,
  EARLYBIRD: 0.15,
};

export const KIT_ITEMS = [
  {
    n: "01",
    title: "The Client Contract",
    desc: "A plain-English agreement that protects your scope, your payment schedule and your sanity. Reviewed by an IP lawyer, written for humans.",
    formats: ["Docs", "Word", "Notion"],
    icon: "FileSignature",
  },
  {
    n: "02",
    title: "The Proposal System",
    desc: "A modular proposal that sells the outcome, not the deliverables. Three priced options on every project — watch average deal size climb.",
    formats: ["Docs", "Figma", "Notion"],
    icon: "Presentation",
  },
  {
    n: "03",
    title: "Pricing Frameworks",
    desc: "Value-based pricing worksheets, a day-rate calculator and the exact language to justify your numbers without apologising.",
    formats: ["Sheets", "Notion"],
    icon: "Calculator",
  },
  {
    n: "04",
    title: "Onboarding Flow",
    desc: "Welcome packet, kickoff questionnaire and a client portal template. New clients feel taken care of from minute one.",
    formats: ["Notion", "Docs"],
    icon: "DoorOpen",
  },
  {
    n: "05",
    title: "Scope & Change Orders",
    desc: "The polite, firm templates for “actually, that's extra.” Change requests become revenue instead of resentment.",
    formats: ["Docs", "Word"],
    icon: "GitPullRequestArrow",
  },
  {
    n: "06",
    title: "Offboarding & Referrals",
    desc: "Handoff checklist, testimonial request sequence and a referral ask that doesn't feel like an ask. End projects so the next one starts itself.",
    formats: ["Docs", "Notion"],
    icon: "PackageCheck",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "I raised my project minimum from ৳3,60,000 to ৳9,60,000 using the proposal system. The first client I sent it to picked the middle option without a single objection. It paid for itself forty times over on one project.",
    name: "Maya Okonkwo",
    role: "Brand designer, Lagos / London",
    initials: "MO",
    featured: true,
  },
  {
    quote:
      "The change-order template alone ended two years of scope-creep misery. Clients actually respect the boundaries now.",
    name: "Jonas Reber",
    role: "Independent product designer",
    initials: "JR",
    featured: false,
  },
  {
    quote:
      "I've bought a lot of template packs. This is the first one where every single file felt like it was written by someone who's done the work.",
    name: "Priya Anand",
    role: "Founder, Anand Studio",
    initials: "PA",
    featured: false,
  },
];

export const FAQS = [
  {
    q: "What exactly do I get after purchase?",
    a: "An instant download link plus a permanent library page with every file in Notion, Google Docs and Word formats (plus Figma for the proposal). The Complete tier adds the masterclass videos, swipe files and community invite. Everything is yours to keep, forever.",
  },
  {
    q: "Is the contract legally valid in my country?",
    a: "The contract was drafted with an IP lawyer and is used by designers in 40+ countries. It's written to common-law standards (US, UK, Canada, Australia and most of the EU). We include a one-page guide on what to localise, and we always recommend a quick review by a local lawyer for high-stakes projects.",
  },
  {
    q: "I'm just starting out. Is this overkill?",
    a: "It's the opposite — this is the stuff most designers learn the hard way after 3–4 painful projects. Starting with proper contracts and proposals means you skip the painful part. About a third of our customers are in their first year of freelancing.",
  },
  {
    q: "Do I need Notion or any paid software?",
    a: "No. Every template ships in free formats — Google Docs, Word and a free Notion account covers everything. The rate calculator works in Google Sheets or Excel.",
  },
  {
    q: "What if it's not for me?",
    a: "Email us within 30 days and we'll refund you in full, no questions and no forms. You can even keep the files. Fewer than 2% of customers ask.",
  },
  {
    q: "How do updates work?",
    a: "Buy once, get every future version free. We ship an update every quarter — v3.2 landed in January 2026 with new retainer agreements and an AI-usage clause for contracts. You'll get an email whenever the library changes.",
  },
];

export function formatTaka(n: number): string {
  return `৳${new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(n)}`;
}