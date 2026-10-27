import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Calculator,
  Check,
  DoorOpen,
  Download,
  FileSignature,
  GitPullRequestArrow,
  PackageCheck,
  Presentation,
  Quote,
  RefreshCw,
  Star,
  type LucideIcon,
} from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import BuyBar from "@/components/BuyBar";
import { formatTaka } from "@/lib/product";
import { getSiteContent } from "@/lib/site-content";
import LocalizedHero from "@/components/LocalizedHero";
import { Text } from "@/components/SiteLanguage";



const ICONS: Record<string, LucideIcon> = {
  FileSignature,
  Presentation,
  Calculator,
  DoorOpen,
  GitPullRequestArrow,
  PackageCheck,
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  return (
    <>
      <SiteNav brand={content.brand} announcement={content.announcement} mobileCta={content.cta} />
      <main>
        {/* ————— HERO ————— */}
        <section className="relative overflow-hidden pt-[132px] sm:pt-[148px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-40 h-[480px] w-[480px] rounded-full bg-moss/50 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 sm:px-6 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
            <div>
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-line bg-cream/70 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-pine uppercase">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pine" />
                  <Text english={content.pageCopy.designers.en} />
                </p>
              </Reveal>
              <Reveal delay={80}>
                <LocalizedHero headline={content.headline} description={content.description} />
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/checkout?plan=standard"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-pine px-7 py-4 text-base font-semibold text-paper transition-all hover:bg-pine-deep hover:shadow-xl hover:shadow-pine/25 active:scale-[0.98]"
                  >
                    <Text english={content.cta} />
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/#inside"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-7 py-4 text-base font-semibold transition-colors hover:border-ink/40 hover:bg-cream/60"
                  >
                    <Text english="See what’s inside" />
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="flex text-pine">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </span>
                    <strong className="font-semibold text-ink">4.9</strong>
                    <Text english="(612 reviews)" />
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Download className="h-4 w-4 text-pine" /> <Text english="4,800+ sold" />
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <RefreshCw className="h-4 w-4 text-pine" /> <Text english="Free lifetime updates" />
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative">
              <div className="relative">
                <div className="overflow-hidden rounded-[20px] border border-ink/10 shadow-[0_32px_64px_-24px_rgba(23,33,27,0.35)]">
                  <SafeImage
                    src="/images/toolkit-hero.png"
                    alt="Form & Folio toolkit — contract, proposal booklet and pricing cards"
                    fallbackLabel="Form & Folio Toolkit"
                    width={1024}
                    height={1024}
                    priority
                    className="h-auto w-full"
                  />
                </div>
                <div className="absolute -top-4 -right-3 flex h-20 w-20 rotate-6 items-center justify-center rounded-full bg-citron text-center font-display text-sm leading-tight font-semibold shadow-lg sm:-right-5 sm:h-24 sm:w-24">
                  v3.2
                  <br />
                  Jan &apos;26
                </div>
                <div className="absolute -bottom-5 left-4 animate-float rounded-xl border border-ink/10 bg-paper px-4 py-3 shadow-xl sm:left-8">
                  <p className="text-[11px] font-bold tracking-wide text-ink-soft uppercase">
                    <Text english="Proposal #147" />
                  </p>
                  <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    <BadgeCheck className="h-4 w-4 text-pine" />
                    <Text english="Signed in 2 days — ৳14,88,000" />
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* marquee */}
          <div className="border-y border-line bg-cream/50 py-4">
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex w-max animate-marquee items-center gap-10 pr-10">
                {[...content.pageCopy.studios.en.split("|"), ...content.pageCopy.studios.en.split("|")].map((s, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-10 text-sm font-semibold whitespace-nowrap text-ink-soft/70"
                  >
                    <Text english={s} />
                    <span className="h-1 w-1 rounded-full bg-pine/40" />
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] tracking-[0.16em] text-ink-soft/60 uppercase">
              <Text english={content.pageCopy.socialProof.en} />
            </p>
          </div>
        </section>

        {/* ————— STATS ————— */}
        <section className="bg-pine-deep text-paper">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-4">
            {[
              ["4,800+", content.pageCopy.stats.en.split("|")[0]],
              ["12", content.pageCopy.stats.en.split("|")[1]],
              ["6 hrs", content.pageCopy.stats.en.split("|")[2]],
              ["30 days", content.pageCopy.stats.en.split("|")[3]],
            ].map(([num, label], i) => (
              <Reveal key={label} delay={i * 80} className="px-2 py-4 sm:px-6">
                <p className="font-display text-4xl font-medium text-citron sm:text-5xl">
                  {num}
                </p>
                <p className="mt-2 text-sm text-moss/90"><Text english={label} /></p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ————— WHAT'S INSIDE ————— */}
        <section id="inside" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.16em] text-pine uppercase">
                    <Text english={content.pageCopy.insideEyebrow.en} />
                  </p>
                  <h2 className="mt-3 max-w-xl font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
                    <Text english={content.pageCopy.insideTitle.en} />
                  </h2>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
                  <Text english={content.pageCopy.insideDesc.en} />
                </p>
              </div>
            </Reveal>

            <div className="mt-12 border-t border-line">
              {content.kitItems.map((item, i) => {
                const Icon = ICONS[item.icon];
                return (
                  <Reveal key={item.n} delay={Math.min(i * 60, 240)}>
                    <div className="group grid gap-3 border-b border-line py-6 transition-colors duration-300 hover:bg-cream/60 sm:grid-cols-[64px_48px_1fr_auto] sm:items-start sm:gap-6 sm:px-4 sm:py-8">
                      <span className="font-display text-sm text-ink-soft/60 sm:pt-1.5 sm:text-base">
                        {item.n}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-pine transition-all duration-300 group-hover:border-pine group-hover:bg-pine group-hover:text-paper">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-medium sm:text-2xl">
                          <Text english={item.title} />
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-[15px]">
                          <Text english={item.desc} />
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:flex-col sm:items-end">
                        {item.formats.map((f) => (
                          <span
key={f}
                            className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-semibold text-ink-soft"
                          >
                            <Text english={f} />
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ————— PREVIEW ————— */}
        <section id="preview" className="scroll-mt-28 bg-cream/50">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
            <Reveal className="relative order-2 lg:order-1">
              <div className="overflow-hidden rounded-[20px] border border-ink/10 shadow-[0_24px_48px_-20px_rgba(23,33,27,0.3)]">
                <SafeImage
                  src="/images/toolkit-inside.png"
                  alt="Inside the proposal booklet — typography and layout preview"
                  fallbackLabel="Proposal Booklet Inside"
                  width={1024}
                  height={1024}
                  className="h-auto w-full"
                />
              </div>
              <div className="absolute -right-2 -bottom-5 rounded-xl border border-ink/10 bg-pine-deep px-4 py-3 text-paper shadow-xl sm:-right-4">
                <p className="font-display text-lg leading-none font-medium text-citron">
                  <Text english="3 options" />
                </p>
                <p className="mt-1 text-[11px] text-moss">
                  <Text english="on every proposal, by default" />
                </p>
              </div>
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <p className="text-xs font-bold tracking-[0.16em] text-pine uppercase">
                  <Text english={content.pageCopy.previewEyebrow.en} />
                </p>
                <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
                  <Text english={content.pageCopy.previewTitle.en} />
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft">
                  <Text english={content.pageCopy.previewDesc.en} />
                </p>
              </Reveal>
              <div className="mt-8 space-y-4">
                {content.pageCopy.previewBullets.en.split("|").map((line, i) => (
                  <Reveal key={line} delay={i * 80}>
                    <p className="flex items-start gap-3 text-[15px] font-medium">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine text-paper">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <Text english={line} />
                    </p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={340}>
                <div className="mt-9 flex items-center gap-4 rounded-2xl border border-line bg-paper p-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pine font-display text-base font-semibold text-paper">
                    EK
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      <Text english={content.pageCopy.creator.en} />
                    </p>
                    <p className="text-xs leading-relaxed text-ink-soft">
                      <Text english={content.pageCopy.creatorBio.en} />
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ————— TESTIMONIALS ————— */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.16em] text-pine uppercase">
                <Text english={content.pageCopy.reviewsEyebrow?.en ?? "From the field"} />
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
                <Text english={content.pageCopy.reviewsTitle.en} />
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
              {content.testimonials.filter((t) => t.featured).map((t) => (
                <Reveal key={t.name}>
                  <figure className="flex h-full flex-col justify-between rounded-[20px] bg-pine-deep p-7 text-paper sm:p-10">
                    <div>
                      <Quote className="h-8 w-8 text-citron" />
                      <blockquote className="mt-5 font-display text-xl leading-snug font-medium text-balance sm:text-[26px]">
                        “<Text english={t.quote} />”
                      </blockquote>
                    </div>
                    <figcaption className="mt-8 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-citron font-display text-sm font-semibold text-ink">
                        {t.initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-moss"><Text english={t.role} /></p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
              <div className="grid gap-5">
                {content.testimonials.filter((t) => !t.featured).map((t, i) => (
                  <Reveal key={t.name} delay={100 + i * 100}>
                    <figure className="flex h-full flex-col justify-between rounded-[20px] border border-line bg-cream/50 p-6 transition-colors hover:bg-cream sm:p-7">
                      <blockquote className="text-[15px] leading-relaxed text-ink">
                        “<Text english={t.quote} />”
                      </blockquote>
                      <figcaption className="mt-5 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-moss font-display text-xs font-semibold text-pine-deep">
                          {t.initials}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-xs text-ink-soft"><Text english={t.role} /></p>
                        </div>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ————— PRICING ————— */}
        <section id="pricing" className="scroll-mt-28 border-t border-line bg-cream/40">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-xs font-bold tracking-[0.16em] text-pine uppercase">
                  <Text english={content.pageCopy.pricingEyebrow.en} />
                </p>
                <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
                  <Text english={content.pageCopy.pricingTitle.en} />
                </h2>
                <p className="mt-4 text-base text-ink-soft">
                  <Text english={content.pageCopy.pricingDesc.en} />
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {/* standard */}
              <Reveal>
                <div className="relative flex h-full flex-col rounded-[24px] bg-pine-deep p-7 text-paper sm:p-10">
                  <span className="absolute -top-3 left-7 rounded-full bg-citron px-3 py-1 text-[11px] font-bold tracking-wide text-ink uppercase">
                    <Text english="Most popular" />
                  </span>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-medium">
                      <Text english={content.plans.standard.name} />
                    </h3>
                    <p className="text-right">
                      <span className="text-sm text-moss line-through">
                        <Text english={formatTaka(content.plans.standard.compareAt!)} />
                      </span>{" "}
                      <span className="font-display text-5xl font-medium text-citron">
                        <Text english={formatTaka(content.plans.standard.price)} />
                      </span>
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-moss">
                    <Text english={content.plans.standard.tagline} />
                  </p>
                  <ul className="mt-7 space-y-3">
                    {content.plans.standard.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-citron"
                          strokeWidth={3}
                        />
                        <Text english={f} />
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/checkout?plan=standard"
                    className="group mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-citron px-6 py-4 text-base font-bold text-ink transition-all hover:brightness-105 active:scale-[0.98]"
                  >
                    <Text english="Get The Toolkit" />
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="mt-3 text-center text-xs text-moss/80">
                    <Text english="Instant download · 30-day guarantee" />
                  </p>
                </div>
              </Reveal>

              {/* complete */}
              <Reveal delay={120}>
                <div className="flex h-full flex-col rounded-[24px] border border-line bg-paper p-7 sm:p-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-medium">
                      <Text english={content.plans.complete.name} />
                    </h3>
                    <p className="text-right">
                      <span className="text-sm text-ink-soft line-through">
                        <Text english={formatTaka(content.plans.complete.compareAt!)} />
                      </span>{" "}
                      <span className="font-display text-5xl font-medium text-pine">
                        <Text english={formatTaka(content.plans.complete.price)} />
                      </span>
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">
                    <Text english={content.plans.complete.tagline} />
                  </p>
                  <ul className="mt-7 space-y-3">
                    {content.plans.complete.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-pine"
                          strokeWidth={3}
                        />
                        <Text english={f} />
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/checkout?plan=complete"
                    className="group mt-9 inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-[14px] text-base font-bold transition-all hover:bg-ink hover:text-paper active:scale-[0.98]"
                  >
                    <Text english="Get Toolkit + Masterclass" />
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="mt-3 text-center text-xs text-ink-soft">
                    <Text english="Everything, plus the 3.5-hour masterclass" />
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <p className="mt-8 text-center text-sm text-ink-soft">
                Team of 2–10?{" "}
                <a
                  href="mailto:hello@studiostandard.co?subject=Studio%20license"
                  className="link-sweep font-semibold text-pine"
                >
                  <Text english="Ask about studio licenses" />
                </a>{" "}
                <Text english="· Prices in BDT, VAT calculated at checkout." />
              </p>
            </Reveal>
          </div>
        </section>

        {/* ————— FAQ ————— */}
        <section id="faq" className="scroll-mt-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-36">
                <p className="text-xs font-bold tracking-[0.16em] text-pine uppercase">
                  <Text english={content.pageCopy.faqEyebrow.en} />
                </p>
                <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
                  <Text english={content.pageCopy.faqTitle.en} />
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
                  <Text english="Something else on your mind? Write to" />{" "}
                  <a
                    href="mailto:hello@studiostandard.co"
                    className="link-sweep font-semibold text-pine"
                  >
                    hello@studiostandard.co
                  </a>{" "}
                  <Text english="— a human replies within a day." />
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Faq faqs={content.faqs} />
            </Reveal>
          </div>
        </section>

        {/* ————— FINAL CTA ————— */}
        <section className="relative overflow-hidden bg-pine-deep text-paper">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-pine/40 blur-3xl"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <Reveal>
              <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight font-medium tracking-tight text-balance sm:text-6xl">
                <Text english={content.pageCopy.finalTitle.en} />
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-moss">
                <Text english={content.pageCopy.finalDesc.en} />
              </p>
              <Link
                href="/checkout?plan=standard"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-citron px-8 py-4 text-base font-bold text-ink transition-all hover:brightness-105 hover:shadow-2xl hover:shadow-citron/20 active:scale-[0.98]"
              >
                <Text english={content.cta} />
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <p className="mt-4 text-xs text-moss/80">
                <Text english="One-time payment · Instant access · 30-day money-back guarantee" />
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter brand={content.brand} about={content.about} />
      <BuyBar price={content.plans.standard.price} compareAt={content.plans.standard.compareAt} />
    </>
  );
}