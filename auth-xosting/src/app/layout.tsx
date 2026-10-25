import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kirish — xosting.net",
  description: "xosting.net mijozlar paneliga kirish yoki ro'yxatdan o'tish.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-background text-white antialiased selection:bg-primary-500/30">
        {children}
      </body>
    </html>
  );
}