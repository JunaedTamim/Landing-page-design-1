import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { DEFAULT_CONTENT, getSiteContent, saveSiteContent, type SiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";
const COOKIE = "formfolio_admin";
function token() {
  const secret = process.env.ADMIN_PASSWORD;
  return secret ? createHmac("sha256", secret).update("form-folio-admin-session").digest("hex") : null;
}
function authenticated(request: Request) {
  const expected = token();
  const actual = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!expected || !actual) return false;
  const a = Buffer.from(expected); const b = Buffer.from(actual);
  return a.length === b.length && timingSafeEqual(a, b);
}
function validContent(input: unknown): input is SiteContent {
  if (!input || typeof input !== "object" || Array.isArray(input)) return false;
  const value = input as Record<string, unknown>;
  if (JSON.stringify(value).length > 80_000) return false;
  const required = ["brand", "announcement", "announcementBn", "headline", "description", "cta", "headlineBn", "descriptionBn", "ctaBn", "about", "aboutBn"];
  if (required.some((key) => typeof value[key] !== "string" || (value[key] as string).length > 1200)) return false;
  if (!Array.isArray(value.kitItems) || value.kitItems.length > 20 || !Array.isArray(value.faqs) || value.faqs.length > 30 || !Array.isArray(value.testimonials) || value.testimonials.length > 30) return false;
  if (!value.plans || typeof value.plans !== "object" || !value.pageCopy || typeof value.pageCopy !== "object") return false;
  const plans = value.plans as SiteContent["plans"];
  if (!["standard", "complete"].every((id) => {
    const plan = plans[id as "standard" | "complete"];
    return plan && Number.isFinite(plan.price) && Number.isFinite(plan.compareAt) && Array.isArray(plan.features) && Array.isArray(plan.featuresBn);
  })) return false;
  if (!(value.kitItems as unknown[]).every((item) => item && typeof item === "object" && Array.isArray((item as { formats?: unknown }).formats))) return false;
  if (!(value.faqs as unknown[]).every((item) => item && typeof item === "object" && typeof (item as { q?: unknown }).q === "string" && typeof (item as { a?: unknown }).a === "string")) return false;
  if (!(value.testimonials as unknown[]).every((item) => item && typeof item === "object" && typeof (item as { name?: unknown }).name === "string" && typeof (item as { quote?: unknown }).quote === "string")) return false;
  const strings: string[] = [];
  const collect = (v: unknown) => {
    if (typeof v === "string") strings.push(v);
    else if (Array.isArray(v)) v.forEach(collect);
    else if (v && typeof v === "object") Object.values(v).forEach(collect);
  };
  collect(value);
  return strings.every((text) => text.length <= 1800);
}

export async function GET(request: Request) {
  if (!authenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getSiteContent());
}
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  if (body.action === "login") {
    const secret = process.env.ADMIN_PASSWORD;
    if (!secret) return NextResponse.json({ error: "Admin sign-in is not configured. Set ADMIN_PASSWORD in Vercel." }, { status: 503 });
    const supplied = typeof body.password === "string" ? body.password : "";
    const a = Buffer.from(secret); const b = Buffer.from(supplied);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE, token()!, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 12 });
    return response;
  }
  if (body.action === "logout") {
    const response = NextResponse.json({ ok: true }); response.cookies.set(COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 }); return response;
  }
  if (!authenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "Set DATABASE_URL in Vercel to save published content." }, { status: 503 });
  const candidate = { ...DEFAULT_CONTENT, ...body };
  if (!validContent(candidate)) return NextResponse.json({ error: "Some content is missing or too long. Review your entries and try again." }, { status: 422 });
  try { await saveSiteContent(candidate); return NextResponse.json({ ok: true }); }
  catch (error) { console.error(error); return NextResponse.json({ error: "Could not save content." }, { status: 500 }); }
}
