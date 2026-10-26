"use client";
import { useEffect, useState } from "react";
export default function LocalizedHero({ headline, description, cta, headlineBn, descriptionBn, ctaBn }: { headline:string; description:string; cta:string; headlineBn:string; descriptionBn:string; ctaBn:string }) {
  const [bn, setBn] = useState(false);
  // Hydrate persisted browser preference/content and subscribe to UI events.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { const update = (event: Event) => setBn((event as CustomEvent<string>).detail === "bn"); const saved = localStorage.getItem("ff-language") === "bn"; setBn(saved); window.addEventListener("site-language-change", update); return () => window.removeEventListener("site-language-change", update); }, []);
  return <><h1 className="mt-6 max-w-2xl font-display text-[44px] leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-[72px]">{bn ? headlineBn : headline}</h1><p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">{bn ? descriptionBn : description}</p><span className="sr-only" data-current-cta={bn ? ctaBn : cta} /></>;
}
