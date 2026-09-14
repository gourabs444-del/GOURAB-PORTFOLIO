import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono, Instrument_Serif, Inter, Oswald, Cormorant_Garamond, Cinzel, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

const fontBodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const fontLuxury = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-luxury",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const fontCinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["600", "700", "800"],
  display: "swap",
});

const fontOswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["600", "700"],
  display: "swap",
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const fontSyne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fontPlusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fontJetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.tagline,
  keywords: [
    "Creative Developer",
    "Digital Architect",
    "WebGL",
    "Three.js",
    "GSAP",
    "Next.js",
    "TypeScript",
    "Video Director",
    "AI Systems",
    "Awwwards",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gourab.dev",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.tagline,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.tagline,
    creator: "@gourab_x",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontBodoni.variable} ${fontOswald.variable} ${fontLuxury.variable} ${fontCinzel.variable} ${fontInter.variable} ${fontSyne.variable} ${fontSerif.variable} ${fontSpaceGrotesk.variable} ${fontPlusJakarta.variable} ${fontJetBrainsMono.variable}`}
    >
      <body className="bg-white text-[#111111] antialiased selection:bg-[#111111] selection:text-white min-h-screen relative">
        {children}
      </body>
    </html>
  );
}
