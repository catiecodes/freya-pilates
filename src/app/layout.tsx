import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Freya Pilates | Calistoga & Napa Valley",
    template: "%s | Freya Pilates",
  },
  description:
    "Private Pilates instruction, curated retreats, and group classes with Freya Morgen in Calistoga and the Napa Valley. Reformer, Cadillac, Chair & Mat. Customized Pilates retreats at partner properties.",
  keywords: [
    "Pilates retreat Napa Valley",
    "curated Pilates retreat California",
    "private Pilates retreat Wine Country",
    "Pilates instructor Calistoga",
    "Pilates retreat partner properties",
    "Napa Valley wellness retreat",
    "private Pilates sessions Napa Valley",
    "Reformer Pilates Calistoga",
    "Pilates instructor Solage",
    "customized Pilates retreat",
  ],
  metadataBase: new URL("https://freyapilates.com"),
  openGraph: {
    siteName: "Freya Pilates",
    type: "website",
    locale: "en_US",
    url: "https://freyapilates.com",
    description:
      "Private Pilates instruction and curated retreats with Freya Morgen in Calistoga and the Napa Valley.",
  },
  alternates: {
    canonical: "https://freyapilates.com",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Nav />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
