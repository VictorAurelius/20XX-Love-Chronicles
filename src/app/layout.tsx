import type { Metadata } from "next";
import { Playfair_Display, Poppins, Great_Vibes } from "next/font/google";
import "./globals.css";

// Romantic fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "20XX Love Chronicles - Our Love Story",
  description: "A romantic timeline of our journey together 💕",
  keywords: ["love", "romance", "couple", "timeline", "memories"],
  authors: [{ name: "Love Chronicles" }],
  openGraph: {
    title: "20XX Love Chronicles",
    description: "Our love story, beautifully told",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${greatVibes.variable}`}>
      <body className="font-body antialiased bg-romantic-warmWhite text-gray-800">
        {children}
      </body>
    </html>
  );
}
