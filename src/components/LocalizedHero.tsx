export default function LocalizedHero({ headline, description }: { headline: string; description: string }) {
  return <><h1 className="mt-6 max-w-2xl font-display text-[44px] leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-[72px]">{headline}</h1><p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p></>;
}
