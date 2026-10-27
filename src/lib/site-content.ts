import { pool } from "@/db";

import { DEFAULT_CONTENT, type SiteContent } from "@/lib/site-content-shared";
export { DEFAULT_CONTENT, type SiteContent } from "@/lib/site-content-shared";

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
