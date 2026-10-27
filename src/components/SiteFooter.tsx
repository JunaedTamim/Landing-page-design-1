import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Text } from "@/components/SiteLanguage";

export default function SiteFooter({ brand = "Form & Folio", about = "The business toolkit for independent designers. Made by designers who got tired of learning the hard way." }: { brand?: string; about?: string }) {
  return (
    <footer className="border-t border-line bg-cream/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold">
              {brand}<span className="text-pine">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              <Text english={about} />
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft">
              <ShieldCheck className="h-3.5 w-3.5 text-pine" />
              <Text english="30-day money-back guarantee" />
            </p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
              <Text english="Product" />
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/#inside" className="link-sweep">
                  <Text english="What’s inside" />
                </Link>
              </li>
              <li>
                <Link href="/#preview" className="link-sweep">
                  <Text english="Preview the files" />
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="link-sweep">
                  <Text english="Pricing" />
                </Link>
              </li>
              <li>
                <Link href="/checkout?plan=standard" className="link-sweep">
                  <Text english="Checkout" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
              <Text english="Support" />
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/#faq" className="link-sweep">
                  <Text english="FAQ" />
                </Link>
              </li>
              <li>
                <a href="mailto:hello@studiostandard.co" className="link-sweep">
                  hello@studiostandard.co
                </a>
              </li>
              <li>
                <a href="mailto:refunds@studiostandard.co" className="link-sweep">
                  <Text english="Refunds (no forms)" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand}. <Text english="All rights reserved." /></p>
          <p><Text english="Templates are not legal advice. v3.2 · Updated Jan 2026" /></p>
        </div>
      </div>
    </footer>
  );
}