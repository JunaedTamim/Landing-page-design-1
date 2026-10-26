import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — The Design Practice",
  description: "Complete your purchase of The Design Practice toolkit.",
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-ink-soft">Loading checkout…</p>
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}