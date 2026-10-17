import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";

export const metadata: Metadata = {
  title: "Abu Maaz Event Management Group | Bulk Catering & Kirana Supply",
  description:
    "Premium wedding catering, Walima, and wholesale Kirana grocery supply. Authentic Awadhi and Mughlai flavors, strict hygiene, and flawless event management.",
  keywords: [
    "Abu Maaz Catering",
    "Wedding Catering",
    "Walima Biryani",
    "Bulk Kirana Supply",
    "Event Management",
    "Catering Services",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1a201c] antialiased selection:bg-[#d4af37]/30 selection:text-[#0b2a1f]">
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingActions />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
