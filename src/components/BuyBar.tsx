"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { formatTaka } from "@/lib/product";

export default function BuyBar({ price, compareAt }: { price: number; compareAt: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      const nearBottom =
        window.innerHeight + window.scrollY >
        document.body.scrollHeight - 700;
      setShow(past && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-300 md:hidden ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-ink/95 px-4 py-3 shadow-2xl shadow-ink/30 backdrop-blur">
        <div className="leading-tight">
          <p className="text-sm font-semibold text-paper">The Toolkit</p>
          <p className="text-xs text-moss">
            <span className="line-through opacity-60">{formatTaka(compareAt)}</span> {formatTaka(price)} · one-time
          </p>
        </div>
        <Link
          href="/checkout?plan=standard"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-citron px-4 py-2.5 text-sm font-bold text-ink active:scale-95"
        >
          Get it <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}