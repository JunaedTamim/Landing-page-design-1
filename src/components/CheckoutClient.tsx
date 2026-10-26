"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronDown,
  CreditCard,
  Download,
  Loader2,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
  Tag,
  X,
  Zap,
} from "lucide-react";
import { COUPONS, PLANS, formatUSD, type PlanId } from "@/lib/product";

const VAT_COUNTRIES = new Set([
  "GB", "DE", "FR", "NL", "ES", "IT", "PT", "IE", "BE", "AT", "SE", "PL",
]);

const COUNTRIES: [string, string][] = [
  ["US", "United States"],
  ["CA", "Canada"],
  ["GB", "United Kingdom"],
  ["DE", "Germany"],
  ["FR", "France"],
  ["NL", "Netherlands"],
  ["ES", "Spain"],
  ["IT", "Italy"],
  ["PT", "Portugal"],
  ["IE", "Ireland"],
  ["BE", "Belgium"],
  ["AT", "Austria"],
  ["SE", "Sweden"],
  ["PL", "Poland"],
  ["AU", "Australia"],
  ["IN", "India"],
  ["OTHER", "Other / not listed"],
];

function money(cents: number) {
  return `$${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;
}

type Errors = Partial<
  Record<"email" | "fullName" | "card" | "expiry" | "cvc", string>
>;

export default function CheckoutClient() {
  const params = useSearchParams();
  const initialPlan: PlanId =
    params.get("plan") === "complete" ? "complete" : "standard";

  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("US");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState<{ reference: string } | null>(null);

  const totals = useMemo(() => {
    const base = PLANS[plan].price * 100;
    const discount = coupon ? Math.round(base * COUPONS[coupon]) : 0;
    const subtotal = base - discount;
    const vat = VAT_COUNTRIES.has(country) ? Math.round(subtotal * 0.2) : 0;
    return { base, discount, subtotal, vat, total: subtotal + vat };
  }, [plan, coupon, country]);

  function formatCard(v: string) {
    return v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  }

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (code in COUPONS) {
      setCoupon(code);
      setCouponError("");
      setCouponInput("");
    } else {
      setCouponError(`“${code}” isn't a valid code.`);
    }
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      e.email = "Enter a valid email — your files go here.";
    if (fullName.trim().length < 2) e.fullName = "Enter your full name.";
    if (card.replace(/\s/g, "").length !== 16)
      e.card = "Card number must be 16 digits.";
    const m = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) {
      e.expiry = "Use MM/YY.";
    } else {
      const exp = new Date(2000 + Number(m[2]), Number(m[1]), 0);
      if (exp < new Date()) e.expiry = "Card has expired.";
    }
    if (!/^\d{3,4}$/.test(cvc)) e.cvc = "3–4 digits.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setProcessing(true);
    try {
      // simulate payment network latency
      await new Promise((r) => setTimeout(r, 1400));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          fullName: fullName.trim(),
          plan,
          coupon,
          country,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        reference?: string;
        error?: string;
      };
      if (!res.ok || !data.reference) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      setDone({ reference: data.reference });
      window.scrollTo({ top: 0 });
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setProcessing(false);
    }
  }

  /* ————— SUCCESS ————— */
  if (done) {
    const receipt = [
      "FORM & FOLIO — ORDER RECEIPT",
      `Reference: ${done.reference}`,
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Product: ${PLANS[plan].name}`,
      coupon ? `Coupon: ${coupon}` : null,
      `Total paid: ${money(totals.total)}`,
      "",
      "Your download library: https://studiostandard.co/library",
      "Thank you for supporting independent tools.",
    ]
      .filter(Boolean)
      .join("\n");

    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pine shadow-xl shadow-pine/30">
            <Check className="h-9 w-9 text-citron" strokeWidth={3} />
          </div>
          <h1 className="mt-7 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            You&apos;re in.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Order{" "}
            <span className="font-mono font-semibold text-ink">
              {done.reference}
            </span>{" "}
            is confirmed. A receipt and your permanent library link are on
            their way to <strong className="text-ink">{email}</strong>.
          </p>
          <div className="mt-8 rounded-2xl border border-line bg-cream/60 p-5 text-left">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">{PLANS[plan].name}</span>
              <span className="font-semibold">{money(totals.total)}</span>
            </div>
            {coupon && (
              <p className="mt-1 text-xs text-pine">
                Coupon {coupon} applied — you saved {money(totals.discount)}.
              </p>
            )}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(receipt)}`}
                download={`design-practice-receipt-${done.reference}.txt`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-pine px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-pine-deep"
              >
                <Download className="h-4 w-4" /> Download receipt
              </a>
              <Link
                href="/"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold transition-colors hover:bg-cream"
              >
                Back to the site
              </Link>
            </div>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-xs text-ink-soft">
            <Mail className="h-3.5 w-3.5" />
            Nothing in your inbox after 5 minutes? Check spam, then email
            hello@studiostandard.co
          </p>
        </div>
      </main>
    );
  }

  /* ————— CHECKOUT ————— */
  const inputBase =
    "w-full rounded-xl border bg-paper px-4 py-3.5 text-[15px] outline-none transition-all placeholder:text-ink-soft/50 focus:border-pine focus:ring-2 focus:ring-pine/20";
  const inputOk = "border-line";
  const inputBad = "border-red-400 ring-2 ring-red-100";

  return (
    <main className="min-h-screen pb-16">
      {/* header */}
      <header className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <Link href="/" className="font-display text-lg font-semibold">
            Form & Folio<span className="text-pine">.</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pine">
            <Lock className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Secure checkout</span>
            <span className="sm:hidden">Secure</span>
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 sm:pt-12">
        <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Two minutes now, nine years of awkward emails avoided.
        </p>

        {/* mobile order summary toggle */}
        <div className="mt-6 rounded-2xl border border-line bg-cream/60 lg:hidden">
          <button
            onClick={() => setSummaryOpen(!summaryOpen)}
            className="flex w-full items-center justify-between px-4 py-4 text-sm font-semibold"
            aria-expanded={summaryOpen}
          >
            <span className="inline-flex items-center gap-2">
              <Tag className="h-4 w-4 text-pine" /> Order summary
              <ChevronDown
                className={`h-4 w-4 transition-transform ${summaryOpen ? "rotate-180" : ""}`}
              />
            </span>
            <span className="font-display text-lg">{money(totals.total)}</span>
          </button>
          {summaryOpen && (
            <div className="border-t border-line px-4 py-4">
              <SummaryLines
                plan={plan}
                coupon={coupon}
                totals={totals}
                onRemoveCoupon={() => setCoupon(null)}
              />
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-10 lg:mt-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ————— FORM ————— */}
          <form onSubmit={onSubmit} noValidate className="order-2 lg:order-1">
            {/* plan picker */}
            <fieldset>
              <legend className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
                1 · Your edition
              </legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(Object.keys(PLANS) as PlanId[]).map((id) => {
                  const p = PLANS[id];
                  const active = plan === id;
                  return (
                    <button
                      type="button"
                      key={id}
                      onClick={() => setPlan(id)}
                      className={`relative rounded-2xl border-2 p-4 text-left transition-all ${
                        active
                          ? "border-pine bg-pine/5 shadow-md shadow-pine/10"
                          : "border-line bg-paper hover:border-ink/30"
                      }`}
                      aria-pressed={active}
                    >
                      <span
                        className={`absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                          active
                            ? "border-pine bg-pine text-paper"
                            : "border-line"
                        }`}
                      >
                        {active && <Check className="h-3 w-3" strokeWidth={4} />}
                      </span>
                      <p className="pr-7 text-sm font-bold">{p.name}</p>
                      <p className="mt-1 pr-7 text-xs leading-relaxed text-ink-soft">
                        {p.tagline}
                      </p>
                      <p className="mt-3 font-display text-2xl font-medium text-pine">
                        {formatUSD(p.price)}
                        <span className="ml-2 align-middle text-xs font-sans text-ink-soft line-through">
                          {formatUSD(p.compareAt!)}
                        </span>
                      </p>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* contact */}
            <fieldset className="mt-10">
              <legend className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
                2 · Delivery details
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    autoComplete="name"
                    placeholder="Ada Lindqvist"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`${inputBase} ${errors.fullName ? inputBad : inputOk}`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                    Email <span className="font-normal text-ink-soft">(files are sent here)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="ada@studio.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${inputBase} ${errors.email ? inputBad : inputOk}`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="country" className="mb-1.5 block text-sm font-semibold">
                    Country <span className="font-normal text-ink-soft">(for VAT)</span>
                  </label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`${inputBase} ${inputOk} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%2346544b%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
                  >
                    {COUNTRIES.map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* payment */}
            <fieldset className="mt-10">
              <legend className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
                3 · Payment
              </legend>
              <div className="mt-4 rounded-2xl border border-line bg-cream/40 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold">
                    <CreditCard className="h-4 w-4 text-pine" /> Card
                  </p>
                  <div className="flex gap-1.5">
                    {["VISA", "MC", "AMEX"].map((b) => (
                      <span
                        key={b}
                        className="rounded border border-line bg-paper px-1.5 py-0.5 text-[10px] font-bold text-ink-soft"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="card" className="mb-1.5 block text-sm font-semibold">
                      Card number
                    </label>
                    <input
                      id="card"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="4242 4242 4242 4242"
                      value={card}
                      onChange={(e) => setCard(formatCard(e.target.value))}
                      className={`${inputBase} font-mono tracking-wide ${errors.card ? inputBad : inputOk}`}
                    />
                    {errors.card && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">{errors.card}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="expiry" className="mb-1.5 block text-sm font-semibold">
                      Expiry
                    </label>
                    <input
                      id="expiry"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      className={`${inputBase} font-mono ${errors.expiry ? inputBad : inputOk}`}
                    />
                    {errors.expiry && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">{errors.expiry}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="cvc" className="mb-1.5 block text-sm font-semibold">
                      CVC
                    </label>
                    <input
                      id="cvc"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      className={`${inputBase} font-mono ${errors.cvc ? inputBad : inputOk}`}
                    />
                    {errors.cvc && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">{errors.cvc}</p>
                    )}
                  </div>
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pine" />
                  Demo checkout — no real charge is made. Use any 16-digit
                  number, e.g. 4242 4242 4242 4242.
                </p>
              </div>
            </fieldset>

            {/* coupon */}
            <div className="mt-8">
              {coupon ? (
                <div className="flex items-center justify-between rounded-xl border border-pine/30 bg-pine/5 px-4 py-3">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-pine">
                    <BadgeCheck className="h-4 w-4" />
                    {coupon} applied — {Math.round(COUPONS[coupon] * 100)}% off
                  </p>
                  <button
                    type="button"
                    onClick={() => setCoupon(null)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-ink"
                  >
                    <X className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      aria-label="Discount code"
                      placeholder="Discount code (try STUDIO20)"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          applyCoupon();
                        }
                      }}
                      className={`${inputBase} ${couponError ? inputBad : inputOk} flex-1 uppercase placeholder:normal-case`}
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="shrink-0 rounded-xl border border-ink/20 px-5 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{couponError}</p>
                  )}
                </div>
              )}
            </div>

            {serverError && (
              <div className="mt-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pine px-6 py-4 text-base font-bold text-paper transition-all hover:bg-pine-deep hover:shadow-xl hover:shadow-pine/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {processing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Processing
                  payment…
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" /> Pay {money(totals.total)}
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-ink-soft">
              By purchasing you agree to the license terms. One-time payment —
              no subscription, ever.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-6">
              {[
                [Zap, "Instant delivery"],
                [RefreshCw, "30-day refunds"],
                [ShieldCheck, "Secure & encrypted"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof Zap;
                return (
                  <div
                    key={label as string}
                    className="flex flex-col items-center gap-1.5 text-center"
                  >
                    <I className="h-4 w-4 text-pine" />
                    <span className="text-[11px] font-semibold text-ink-soft">
                      {label as string}
                    </span>
                  </div>
                );
              })}
            </div>
          </form>

          {/* ————— SUMMARY (desktop) ————— */}
          <aside className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-8 rounded-[20px] border border-line bg-cream/60 p-6">
              <p className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
                Order summary
              </p>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-paper p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-pine-deep font-display text-sm font-semibold text-citron">
                  SS
                </span>
                <div>
                  <p className="text-sm font-bold">{PLANS[plan].name}</p>
                  <p className="text-xs text-ink-soft">
                    Digital download · v3.2 · lifetime updates
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <SummaryLines
                  plan={plan}
                  coupon={coupon}
                  totals={totals}
                  onRemoveCoupon={() => setCoupon(null)}
                />
              </div>
              <div className="mt-5 rounded-xl bg-pine/5 p-3.5 text-xs leading-relaxed text-ink-soft">
                <strong className="text-pine">The guarantee:</strong> if the
                toolkit doesn&apos;t earn its price back on your next project,
                email us within 30 days for a full refund. Keep the files.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function SummaryLines({
  plan,
  coupon,
  totals,
  onRemoveCoupon,
}: {
  plan: PlanId;
  coupon: string | null;
  totals: { base: number; discount: number; vat: number; total: number };
  onRemoveCoupon: () => void;
}) {
  return (
    <dl className="space-y-2.5 text-sm">
      <div className="flex justify-between">
        <dt className="text-ink-soft">{PLANS[plan].name}</dt>
        <dd className="font-medium">{money(totals.base)}</dd>
      </div>
      {coupon && (
        <div className="flex justify-between text-pine">
          <dt className="inline-flex items-center gap-1.5">
            {coupon} (−{Math.round(COUPONS[coupon] * 100)}%)
            <button
              type="button"
              onClick={onRemoveCoupon}
              aria-label="Remove coupon"
              className="text-ink-soft hover:text-ink"
            >
              <X className="h-3 w-3" />
            </button>
          </dt>
          <dd className="font-medium">−{money(totals.discount)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt className="text-ink-soft">VAT {totals.vat > 0 ? "(20%)" : ""}</dt>
        <dd className="font-medium">
          {totals.vat > 0 ? money(totals.vat) : "$0"}
        </dd>
      </div>
      <div className="flex justify-between border-t border-line pt-3">
        <dt className="font-bold">Total due today</dt>
        <dd className="font-display text-2xl font-semibold text-pine">
          {money(totals.total)}
        </dd>
      </div>
    </dl>
  );
}