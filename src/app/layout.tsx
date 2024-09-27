import type { Metadata } from "next";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "useSpotify()",
  description: "React hook for fetching information via Spotify API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} mx-auto px-4 my-8 max-w-[550px] md:my-16 md:max-w-[900px]`}>
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
