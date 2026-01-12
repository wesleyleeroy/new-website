import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wesley Leeroy",
  description: "Discover a curated collection of premium digital and physical goods. Simple, secure, and friendly transactions.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=gambetta@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${outfit.className} antialiased bg-transparent text-slate-600`}
      >
        {children}
      </body>
    </html>
  );
}
