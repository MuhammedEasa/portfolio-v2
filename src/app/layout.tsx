import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant, Hanken_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Ascend from "@/components/Ascend";
import Cadence from "@/components/Cadence";
import Colophon from "@/components/Colophon";
import Masthead from "@/components/Masthead";
import PageTurnProvider from "@/components/PageTurn";
import Quill from "@/components/Quill";
import Vestibule from "@/components/Vestibule";
import WhatsApp from "@/components/WhatsApp";
import { identity } from "@/lib/manuscript";
import { ThemeProvider } from "@/lib/theme";
import { TongueProvider } from "@/lib/tongue";

// Only the display serif is preloaded; it is the page's largest paint.
const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-hanken",
  display: "swap",
  preload: false,
});

// Arabic families load only when Arabic glyphs render.
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["200", "300", "400"],
  variable: "--font-plexar",
  display: "swap",
  preload: false,
});

const description =
  "Full-stack engineer in Dubai building trading platforms, payment flows, and AI systems. Ten products in production, every deadline met — available for senior roles, freelance work, and consulting.";

export const metadata: Metadata = {
  metadataBase: new URL(identity.website),
  title: {
    default: "Muhammed Easa — Full-Stack Engineer, Dubai",
    template: "%s — Muhammed Easa",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Muhammed Easa — Full-Stack Engineer",
    description,
    url: "https://muhammedeasa.com",
    siteName: "Muhammed Easa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Muhammed Easa — Full-Stack Engineer",
    description,
  },
};

// Person schema for search engines.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammed Easa",
  jobTitle: identity.role.en,
  email: `mailto:${identity.email}`,
  telephone: identity.whatsapp,
  url: identity.website,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  sameAs: [identity.github],
  knowsLanguage: ["English", "Malayalam", "Tamil", "Hindi", "Urdu", "Arabic"],
};

export const viewport: Viewport = {
  themeColor: "#1d1209",
};

// Pre-paint: restore theme and language without a flash.
const restore = `(function(){try{
if(localStorage.getItem("easa-hall")==="day")document.documentElement.setAttribute("data-theme","day");
if(localStorage.getItem("easa-tongue")==="ar"){document.documentElement.lang="ar";document.documentElement.dir="rtl";}
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${cormorant.variable} ${hanken.variable} ${amiri.variable} ${plexArabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: restore }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <TongueProvider>
            <PageTurnProvider>
              <Cadence>
                <Masthead />
                <main>{children}</main>
                <Colophon />
                <Ascend />
                <WhatsApp />
              </Cadence>
            </PageTurnProvider>
            <Vestibule />
          </TongueProvider>
        </ThemeProvider>
        <Quill />
      </body>
    </html>
  );
}
