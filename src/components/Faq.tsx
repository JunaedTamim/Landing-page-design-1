"use client";

import { useState } from "react";
import { Plus } from "lucide-react";


export default function Faq({ faqs }: { faqs: Array<{ q: string; a: string; qBn: string; aBn: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f, i) => {
        const open = openIndex === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="group flex w-full items-center justify-between gap-4 py-5 text-left sm:py-6"
            >
              <span className="font-display text-lg font-medium sm:text-xl">
                {f.q}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  open
                    ? "rotate-45 border-pine bg-pine text-paper"
                    : "border-line text-ink-soft group-hover:border-pine group-hover:text-pine"
                }`}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div className={`faq-panel ${open ? "open" : ""}`}>
              <div>
                <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ink-soft sm:text-base">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}