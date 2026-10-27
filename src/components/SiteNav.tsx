"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import AppearanceControls from "@/components/AppearanceControls";

const LINKS = [
  { href: "/#inside", label: "What's inside" },
  { href: "/#preview", label: "Preview" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export default function SiteNav({ brand = "Form & Folio", announcement, mobileCta }: { brand?: string; announcement?: string; mobileCta?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-pine-deep px-4 py-2 text-center text-[11px] font-semibold tracking-[0.14em] text-moss uppercase">
        {announcement ?? "v3.2 is live — new retainer agreements & AI clause · free for all owners"}
      </div>
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-paper/90 shadow-[0_1px_0_rgba(23,33,27,0.04)] backdrop-blur-md"
            : "border-transparent bg-paper/60 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight"
            onClick={() => setOpen(false)}
          >
            {brand}<span className="text-pine">.</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-sweep text-sm font-medium text-ink-soft hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <AppearanceControls />
            <Link
              href="/checkout?plan=standard"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:bg-pine hover:shadow-lg hover:shadow-pine/20"
            >
              Get the toolkit
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden"><AppearanceControls /><button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button></div>
        </nav>
      </div>

      {/* mobile menu */}
      <div
        className={`fixed inset-x-0 top-[100px] bottom-0 z-40 flex flex-col bg-paper px-6 pt-8 transition-all duration-300 md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line py-4 font-display text-2xl font-medium"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.label}
              <ArrowUpRight className="h-5 w-5 text-pine" />
            </Link>
          ))}
        </div>
        <Link
          href="/checkout?plan=standard"
          onClick={() => setOpen(false)}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-pine px-6 py-4 text-base font-semibold text-paper active:scale-[0.98]"
        >
          {mobileCta ?? "Get the toolkit — ৳10,900"}
        </Link>
        <p className="mt-4 text-center text-xs text-ink-soft">
          Instant download · 30-day money-back guarantee
        </p>
      </div>
    </header>
  );
}