import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Golden Winner Contracting LLC | Built on Trust. Delivered with Precision.",
  description:
    "Golden Winner Contracting LLC, established in 2011 in Dubai UAE, is a multidisciplinary construction company specializing in MEP systems, HVAC, electrical works, and infrastructure maintenance. ISO 9001, 14001, 45001 certified.",
  keywords: [
    "construction Dubai",
    "MEP contractor UAE",
    "HVAC Dubai",
    "electrical contractor",
    "renovation Dubai",
    "fit-out contractor",
    "ISO certified contractor",
  ],
  openGraph: {
    title: "Golden Winner Contracting LLC",
    description: "Built on Trust. Delivered with Precision.",
    type: "website",
    locale: "en_AE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#0A0A0A] text-[#FAFAFA] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
