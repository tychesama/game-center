import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Fredoka,
  Nunito,
  Space_Mono,
} from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const monoFont = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GameCenter",
  description: "A playful board game hub for chess, checkers, and future games.",
  icons: {
    icon: "/gamecenter-mark.svg",
    shortcut: "/gamecenter-mark.svg",
    apple: "/gamecenter-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[
        bricolage.variable,
        fredoka.variable,
        nunito.variable,
        monoFont.variable,
        "h-full antialiased",
      ].join(" ")}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeProvider>
          <div className="min-h-screen bg-[var(--gc-background)] text-[var(--gc-ink)] transition-colors duration-300">
            <SiteHeader />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
