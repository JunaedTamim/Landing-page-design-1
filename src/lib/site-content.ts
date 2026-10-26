import { pool } from "@/db";

export type SiteContent = {
  brand: string;
  headline: string;
  description: string;
  cta: string;
  headlineBn: string;
  descriptionBn: string;
  ctaBn: string;
};

export const DEFAULT_CONTENT: SiteContent = {
  brand: "Form & Folio",
  headline: "Great design deserves a real business behind it.",
  description: "Contracts that protect you. Proposals that close. Pricing you can defend. Twelve documents, refined over nine years of client work — so you never start from a blank page again.",
  cta: "Get the toolkit — $89",
  headlineBn: "দারুণ ডিজাইনের পেছনে থাকা উচিত একটি শক্তিশালী ব্যবসা।",
  descriptionBn: "আপনার সুরক্ষায় চুক্তি। কাজ জেতার প্রস্তাব। আত্মবিশ্বাসের সঙ্গে নির্ধারিত মূল্য।",
  ctaBn: "টুলকিটটি নিন — $৮৯",
};

let tableReady: Promise<void> | undefined;
async function ensureTable() {
  if (!process.env.DATABASE_URL) return;
  tableReady ??= pool.query(`CREATE TABLE IF NOT EXISTS site_content (id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1), content jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())`).then(() => undefined);
  await tableReady;
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!process.env.DATABASE_URL) return DEFAULT_CONTENT;
  try {
    await ensureTable();
    const result = await pool.query("SELECT content FROM site_content WHERE id = 1");
    return result.rows[0]?.content ? { ...DEFAULT_CONTENT, ...result.rows[0].content } : DEFAULT_CONTENT;
  } catch (error) {
    console.error("Could not load site content", error);
    return DEFAULT_CONTENT;
  }
}

export async function saveSiteContent(content: SiteContent) {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required to save website content.");
  await ensureTable();
  await pool.query("INSERT INTO site_content (id, content, updated_at) VALUES (1, $1::jsonb, now()) ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = now()", [JSON.stringify(content)]);
}
