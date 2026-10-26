import type { Metadata } from "next";
import Link from "next/link";
import AdminEditor from "@/components/AdminEditor";
export const metadata: Metadata = { title: "Admin — Form & Folio", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default function AdminPage() {
  return <main className="min-h-screen bg-paper px-4 py-10 text-ink sm:px-6"><div className="mx-auto max-w-4xl"><Link href="/" className="font-display text-xl font-semibold">Form &amp; Folio<span className="text-pine">.</span></Link><p className="mt-12 text-xs font-bold uppercase tracking-[0.2em] text-pine">Site administration</p><h1 className="mt-2 mb-8 font-display text-4xl">Manage your website</h1><AdminEditor /></div></main>;
}
