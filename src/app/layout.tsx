import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Montserrat } from "next/font/google";
import Script from "next/script";
import { copy, site } from "@/lib/content";
import "./globals.css";

// next/font baixa as fontes no build e serve do próprio domínio (sem ida ao Google no carregamento)
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-montserrat", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz"], variable: "--font-fraunces", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || site.url;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA4 = process.env.NEXT_PUBLIC_GA4_ID;

const title = `${site.nome} | Condomínio fechado em ${site.localizacao.cidade}`;
const description = `${copy.hero.subtitulo} ${copy.hero.descricao}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", url: "/", siteName: site.nome, title, description, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Portaria do Reserva dos Ipês" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F4F7FB", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" data-mode="dia" className={`${montserrat.variable} ${fraunces.variable}`}>
      <body>
        {children}
        {PIXEL && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}
          </Script>
        )}
        {GA4 && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
