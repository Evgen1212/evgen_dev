import type { Metadata, Viewport } from "next";
import { Manrope, Comfortaa } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Erriour — От логотипа до логики один специалист!",
  description:
    "Веб-разработка любой сложности: сайты, веб-сервисы, боты, логотипы, системное администрирование. Полный цикл разработки — от идеи до запуска.",
  keywords: [
    "Erriour",
    "веб-разработка",
    "фронтенд",
    "бэкенд",
    "дизайн сайтов",
    "логотипы",
    "боты",
    "системное администрирование",
  ],
  authors: [{ name: "Erriour" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Erriour — веб-разработка любой сложности",
    description:
      "От логотипа до логики — один специалист! Сайты, боты, дизайн, администрирование.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className="dark">
      <body
        className={`${manrope.variable} ${comfortaa.variable} antialiased bg-[#0a0a0b] text-zinc-50`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
