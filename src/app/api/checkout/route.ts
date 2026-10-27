import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { COUPONS, type PlanId } from "@/lib/product";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

const VAT_COUNTRIES = new Set([
  "GB", "DE", "FR", "NL", "ES", "IT", "PT", "IE", "BE", "AT", "SE", "PL",
]);

interface CheckoutBody {
  email?: string;
  fullName?: string;
  plan?: string;
  coupon?: string | null;
  country?: string;
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const fullName = (body.fullName ?? "").trim();
  const planId = body.plan as PlanId;
  const country = (body.country ?? "US").toUpperCase();
  const couponCode = body.coupon ? body.coupon.trim().toUpperCase() : null;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 422 });
  }
  if (fullName.length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 422 });
  }
  const siteContent = await getSiteContent();
  if (!siteContent.plans[planId]) {
    return NextResponse.json({ error: "Unknown plan." }, { status: 422 });
  }
  if (couponCode && !(couponCode in COUPONS)) {
    return NextResponse.json({ error: "Invalid coupon code." }, { status: 422 });
  }

  const plan = siteContent.plans[planId];
  const discount = couponCode ? plan.price * COUPONS[couponCode] : 0;
  const subtotal = plan.price - discount;
  const vat = VAT_COUNTRIES.has(country) ? subtotal * 0.2 : 0;
  const amountSubunits = Math.round((subtotal + vat) * 100);

  if (!process.env.DATABASE_URL) {
    const demoId = Math.random().toString(36).slice(2, 10).toUpperCase();
    return NextResponse.json({
      ok: true,
      reference: `SS-${demoId}`,
      amountSubunits,
    });
  }

  try {
    const [order] = await db
      .insert(orders)
      .values({
        email,
        fullName,
        plan: planId,
        coupon: couponCode,
        country,
        amountCents: amountSubunits,
        status: "paid",
      })
      .returning({ id: orders.id });

    return NextResponse.json({
      ok: true,
      reference: `SS-${order.id.slice(0, 8).toUpperCase()}`,
      amountSubunits,
    });
  } catch (err) {
    console.error("Checkout insert failed:", err);
    return NextResponse.json(
      { error: "We couldn't process your order. Please try again." },
      { status: 500 },
    );
  }
}