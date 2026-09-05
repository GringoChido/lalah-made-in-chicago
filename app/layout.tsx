import type { Metadata } from "next";
import "./globals.css";
import "./album-experience.css";
import { AlbumExperience } from "@/components/album-experience";

export const metadata: Metadata = {
  title: { default: "Lalah Hathaway | Made in Chicago", template: "%s | Lalah Hathaway" },
  description: "Enter Lalah Hathaway's Made in Chicago. Music, videos, tour dates, and more.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><link rel="preload" href="/fonts/magic-vintage.woff" as="font" type="font/woff" crossOrigin="anonymous" /></head>
      <body className="antialiased"><AlbumExperience>{children}</AlbumExperience></body>
    </html>
  );
}
