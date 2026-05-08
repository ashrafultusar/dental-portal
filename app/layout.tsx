import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sabbirdental.com"),
  title: {
    default: "Sabbir Dental Care | Best Dental Clinic in Dhaka",
    template: "%s | Sabbir Dental Care"
  },
  description: "Sabbir Dental Care provides advanced and painless dental treatments in Dhaka. Specializing in Root Canals, Dental Implants, Braces, and Oral Surgery.",
  keywords: [
    "Sabbir Dental Care",
    "Dentist in Dhaka",
    "Best dental clinic in Bangladesh",
    "Painless root canal Dhaka",
    "Teeth whitening cost in Bangladesh",
    "Dental implants Dhaka",
    "Oral surgery clinic",
    "Sabbir Dental Hospital"
  ],
  authors: [{ name: "Sabbir Dental Care" }],
  openGraph: {
    title: "Sabbir Dental Care | Your Smile, Our Priority",
    description: "Get world-class dental care with modern technology. Book your appointment today at Sabbir Dental Care.",
    url: "https://www.sabbirdental.com",
    siteName: "Sabbir Dental Care",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Sabbir Dental Care Clinic",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabbir Dental Care | Advanced Dental Solutions",
    description: "Quality dental care for you and your family. Painless treatments and expert dentists.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      suppressHydrationWarning 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}