import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold">
              The Design Practice<span className="text-pine">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              The business toolkit for independent designers. Made by designers
              who got tired of learning the hard way.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft">
              <ShieldCheck className="h-3.5 w-3.5 text-pine" />
              30-day money-back guarantee
            </p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
              Product
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/#inside" className="link-sweep">
                  What&apos;s inside
                </Link>
              </li>
              <li>
                <Link href="/#preview" className="link-sweep">
                  Preview the files
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="link-sweep">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/checkout?plan=standard" className="link-sweep">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
              Support
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/#faq" className="link-sweep">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="mailto:hello@studiostandard.co" className="link-sweep">
                  hello@studiostandard.co
                </a>
              </li>
              <li>
                <a href="mailto:refunds@studiostandard.co" className="link-sweep">
                  Refunds (no forms)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 The Design Practice. All rights reserved.</p>
          <p>Templates are not legal advice. v3.2 · Updated Jan 2026</p>
        </div>
      </div>
    </footer>
  );
}