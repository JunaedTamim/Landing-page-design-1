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
  const content = { ...DEFAULT_CONTENT } as SiteContent;
  for (const key of Object.keys(content) as (keyof SiteContent)[]) {
    const value = body[key];
    if (typeof value !== "string" || value.trim().length < 2 || value.length > 500) return NextResponse.json({ error: `Please enter valid text for ${key}.` }, { status: 422 });
    content[key] = value.trim();
  }
  try { await saveSiteContent(content); return NextResponse.json({ ok: true }); }
  catch (error) { console.error(error); return NextResponse.json({ error: "Could not save content." }, { status: 500 }); }
}
