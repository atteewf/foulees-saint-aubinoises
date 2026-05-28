import type { Metadata } from "next";
import { Bebas_Neue, Barlow, Barlow_Condensed } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: "400",
});
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Foulées Saint Aubinoises",
  description:
    "Site de l'association de course à pied de Saint-Aubin d'Aubigné",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${bebas.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-fsa-blanc text-fsa-noir w-full">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
