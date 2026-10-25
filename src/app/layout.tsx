import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "xosting.net — Tezkor va Ishonchli Hosting",
  description: "O'zbekistondagi eng zamonaviy NVMe SSD hosting xizmati. DDoS himoyasi, 99.9% Uptime va 24/7 texnik yordam.",
  keywords: ["hosting", "xosting", "uzbekistan hosting", "nvme ssd", "vps", "domen"],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "xosting.net — Mukammal Hosting",
    description: "Loyihangiz uchun mukammal muhit. NVMe SSD, DDoS himoyasi.",
    url: "https://xosting.net",
    siteName: "xosting.net",
    locale: "uz_UZ",
    type: "website",
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