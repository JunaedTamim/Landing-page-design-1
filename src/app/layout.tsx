import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "./globals.css";
import SiteTranslator from "@/components/SiteTranslator";

export const metadata: Metadata = {
  title: "Form & Folio — Contracts, proposals & pricing for designers",
  description:
    "The business toolkit trusted by 4,800+ independent designers. Lawyer-reviewed contracts, a proposal system that closes, and pricing frameworks that hold.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f4ee",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="grain bg-paper text-ink antialiased"><SiteTranslator />{children}</body>
    </html>
  );
}