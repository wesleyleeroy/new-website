import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Next does not apply basePath to metadata icon URLs, so prefix it by hand the
// same way the image paths in the pages do.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: "Wesley Leeroy",
  description: "Wesley Leeroy is a Wharton student applying artificial intelligence to real world business and energy problems. Research, publications, and writing.",
  icons: {
    icon: `${basePath}/images/favicon.png`,
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
