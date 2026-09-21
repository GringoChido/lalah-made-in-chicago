import type { Metadata } from "next";
import "./globals.css";
import "./album-experience.css";
import "./client-feedback.css";
import { AlbumExperience } from "@/components/album-experience";
import { RoomTransitionArrival } from "@/components/room-transition";

const siteName = "Lalah Hathaway | Made in Chicago";
const siteDescription = "Enter Lalah Hathaway's Made in Chicago. Music, videos, tour dates, and more.";
// Update to the client's own domain once the custom domain is live on Netlify.
// Share cards need absolute URLs, so this value decides where the artwork resolves from.
const siteUrl = "https://lalah-made-in-chicago.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s | Lalah Hathaway" },
  description: siteDescription,
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Lalah Hathaway",
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    images: [{
      url: "/images/share-made-in-chicago.jpg",
      width: 1200,
      height: 630,
      alt: "Lalah Hathaway standing among records in a listening room.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/images/share-made-in-chicago.jpg"],
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
      <body className="antialiased"><RoomTransitionArrival /><AlbumExperience>{children}</AlbumExperience></body>
    </html>
  );
}
