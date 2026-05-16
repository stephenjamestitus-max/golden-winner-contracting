import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Golden Winner Contracting LLC | Construction & MEP Services Dubai",
  description:
    "UAE trusted multidisciplinary contractor since 2011. MEP, fit-out, renovation, structural works. ISO 9001/14001/45001 certified. Serving Al Futtaim, DAMAC, Tecom and 45+ major clients.",
  keywords: [
    "construction Dubai",
    "MEP contractor UAE",
    "fit-out works Dubai",
    "renovation contractor Sharjah",
    "column jacketing UAE",
    "HVAC Dubai",
    "electrical contractor UAE",
    "ISO certified contractor Dubai",
  ],
  openGraph: {
    title: "Golden Winner Contracting LLC | Construction & MEP Services Dubai",
    description:
      "UAE trusted multidisciplinary contractor since 2011. MEP, fit-out, renovation, structural works. ISO 9001/14001/45001 certified.",
    type: "website",
    locale: "en_AE",
    url: "https://golden-winner-contracting.vercel.app",
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
