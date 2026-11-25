import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4A505B",
};

export const metadata: Metadata = {
  title: "Winging WA | AFS Foils & Manta Foil Assist Australia",
  description:
    "WingingWA is the Australian distributor for AFS Foils and the Western Australian dealer for Manta Foil Assist.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} font-sans h-full antialiased`}
    >
      <body className={`${dmSans.className} min-h-full flex flex-col`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3V5K4GB29F"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3V5K4GB29F');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-TBLZ8FHM"
          strategy="afterInteractive"
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
