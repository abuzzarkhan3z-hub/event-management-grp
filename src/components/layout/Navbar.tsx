"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import {
  Menu,
  X,
  PhoneCall,
  ShoppingBag,
  Sparkles,
  Globe,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav_home") },
    { href: "/catering", label: t("nav_catering") },
    { href: "/menu", label: t("nav_menu") },
    { href: "/kirana", label: t("nav_kirana") },
    { href: "/quote", label: t("nav_calculator") },
    { href: "/about", label: t("nav_about") },
    { href: "/gallery", label: t("nav_gallery") },
    { href: "/contact", label: t("nav_contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav border-b border-[#d4af37]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] bg-[#0b2a1f] flex items-center justify-center text-[#d4af37] shadow-lg shadow-[#0b2a1f]/50 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-[#f3dc8e] transition-colors">
                Abu Maa&apos;s
              </span>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Event & Kirana Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-200 hover:text-[#d4af37] transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#071c14]/50 text-xs font-semibold text-[#f3dc8e] hover:bg-[#d4af37]/10 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{language === "en" ? "हिन्दी" : "English"}</span>
            </button>

            {/* Kirana Cart / Order List */}
            <Link
              href="/kirana/order-list"
              className="relative p-2 rounded-full text-gray-200 hover:text-[#d4af37] hover:bg-white/5 transition-colors"
              title="Kirana Order List"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#0b2a1f] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0b2a1f]">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Quote CTA Button */}
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-[#0b2a1f] gold-gradient-bg shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              {t("cta_quote")}
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs rounded border border-[#d4af37]/40 text-[#f3dc8e]"
            >
              {language === "en" ? "हिन्दी" : "EN"}
            </button>

            <Link
              href="/kirana/order-list"
              className="relative p-2 text-gray-200"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute 0 top-0 right-0 bg-[#d4af37] text-[#0b2a1f] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071c14] border-b border-[#d4af37]/20 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-sm font-medium text-gray-200 hover:text-[#d4af37] rounded-md hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg text-sm font-bold text-[#0b2a1f] gold-gradient-bg"
            >
              {t("cta_quote")}
            </Link>
            <div className="flex gap-2">
              <a
                href="tel:+917983319874"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-[#d4af37] text-xs font-semibold text-[#f3dc8e]"
              >
                <PhoneCall className="w-4 h-4 text-[#d4af37]" />
                {t("call_now")}
              </a>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-center text-xs text-gray-300 hover:text-white border border-white/20 rounded-lg"
              >
                {t("nav_login")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
