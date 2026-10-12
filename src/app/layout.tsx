import type { Metadata } from "next";
import { Playfair_Display, Lora, Cinzel } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeaderGate, SiteFooterGate, MainPaddingGate } from "@/components/SiteChrome";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Classical Roman capitals for the header menu — the same family of lettering
// as the logo's wordmark, so the two read as one piece.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://firefliesinthenight.com"),
  title: {
    default: "Fireflies in the Night",
    template: "%s — Fireflies in the Night",
  },
  description:
    "Essays, songs, Abrar's Memoir, and the history of one community — written down before it's forgotten.",
  icons: {
    icon: "/images/fireflies-logo-icon.png",
  },
  openGraph: {
    title: "Fireflies in the Night",
    description:
      "Essays, songs, Abrar's Memoir, and the history of one community — written down before it's forgotten.",
    siteName: "Fireflies in the Night",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fireflies in the Night",
    description:
      "Essays, songs, Abrar's Memoir, and the history of one community — written down before it's forgotten.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-night-900 text-cream-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-night-950 focus:font-semibold"
        >
          Skip to content
        </a>
        <SiteHeaderGate />
        <MainPaddingGate>{children}</MainPaddingGate>
        <SiteFooterGate />
        <Analytics />
      </body>
    </html>
  );
}
