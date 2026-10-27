"use client";
import { useEffect, useState } from "react";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/site-content-shared";

export default function AdminEditor() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [busy, setBusy] = useState(false);
  async function load() {
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    if (response.ok) { setContent(await response.json() as SiteContent); setLoggedIn(true); }
    setReady(true);
  }
  // Hydrate persisted browser preference/content and subscribe to UI events.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, []);
  async function login(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch("/api/admin/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "login", password }) });
    const data = await response.json() as { error?: string };
    if (response.ok) { setLoggedIn(true); setPassword(""); await load(); } else setMessage(data.error ?? "Unable to sign in.");
    setBusy(false);
  }
  async function save(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch("/api/admin/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    const data = await response.json() as { error?: string };
    setMessage(response.ok ? "Published successfully. Your homepage now uses these updates." : data.error ?? "Could not publish."); setBusy(false);
  }
  async function logout() { await fetch("/api/admin/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) }); setLoggedIn(false); }
  const field = (key: keyof SiteContent, label: string, multiline = false) => <label className="grid gap-2 text-sm font-semibold" key={key}>{label}{multiline ? <textarea className="min-h-28 rounded-xl border border-line bg-paper p-3 font-normal" maxLength={500} value={content[key]} onChange={(e) => setContent({ ...content, [key]: e.target.value })} /> : <input className="rounded-xl border border-line bg-paper p-3 font-normal" maxLength={120} value={content[key]} onChange={(e) => setContent({ ...content, [key]: e.target.value })} />}</label>;
  if (!ready) return <p className="text-ink-soft">Loading…</p>;
  if (!loggedIn) return <form onSubmit={login} className="mx-auto grid max-w-md gap-4 rounded-3xl border border-line bg-white/70 p-8 shadow-xl"><label className="grid gap-2 text-sm font-semibold">Admin password<input autoComplete="current-password" type="password" required className="rounded-xl border border-line bg-paper p-3 font-normal" value={password} onChange={(e) => setPassword(e.target.value)} /></label><button disabled={busy} className="rounded-full bg-pine px-6 py-3 font-bold text-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>{message && <p role="alert" className="text-sm text-red-700">{message}</p>}<p className="text-xs leading-relaxed text-ink-soft">Admin access requires the <code>ADMIN_PASSWORD</code> environment variable. Content publishing also requires <code>DATABASE_URL</code>.</p></form>;
  return <form onSubmit={save} className="rounded-3xl border border-line bg-white/70 p-6 shadow-xl sm:p-9"><div className="mb-8 flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-pine">Homepage editor</p><h2 className="mt-1 font-display text-2xl">Brand &amp; hero content</h2></div><button type="button" onClick={logout} className="text-sm font-semibold text-ink-soft underline">Sign out</button></div><div className="grid gap-5 md:grid-cols-2">{field("brand", "Brand name")}{field("cta", "Call-to-action (English)")}{field("headline", "Hero headline (English)", true)}{field("description", "Hero description (English)", true)}{field("headlineBn", "Hero headline (Bangla)", true)}{field("descriptionBn", "Hero description (Bangla)", true)}{field("ctaBn", "Call-to-action (Bangla)")}</div><div className="mt-7 flex flex-wrap items-center gap-4"><button disabled={busy} className="rounded-full bg-pine px-7 py-3 font-bold text-white disabled:opacity-60">{busy ? "Publishing…" : "Publish changes"}</button>{message && <p role="status" className="text-sm text-ink-soft">{message}</p>}</div><p className="mt-6 text-xs leading-relaxed text-ink-soft">Changes are saved to your connected PostgreSQL database and appear on the public homepage. Configure <code>DATABASE_URL</code> and <code>ADMIN_PASSWORD</code> in Vercel.</p></form>;
}
