import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Find Your Perfect Stay - Accommodation Search with Weather",
  description: "Discover amazing accommodations with real-time weather insights. Search by location, amenities, and weather conditions to find your ideal place to stay.",
  keywords: ["accommodations", "weather", "travel", "booking", "hotels", "vacation rentals"],
  authors: [{ name: "Accommodation Search Team" }],
  openGraph: {
    title: "Find Your Perfect Stay",
    description: "Discover accommodations with real-time weather insights",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Perfect Stay",
    description: "Discover accommodations with real-time weather insights",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
