"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#071c14] text-gray-300 border-t border-[#d4af37]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#d4af37] bg-[#0b2a1f] flex items-center justify-center text-[#d4af37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-wide">
                Abu Maaz Events
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premier bulk catering and wholesale grocery supplier. Crafting memorable culinary experiences for weddings, walimas, corporate events, and traditional gatherings with uncompromised taste & hygiene.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>FSSAI Compliant Kitchens & 100% Halal Certified</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">
              {t("footer_quick_links")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" /> About Our Legacy
                </Link>
              </li>
              <li>
                <Link href="/catering" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" /> Catering Services
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" /> Menu & Packages
                </Link>
              </li>
              <li>
                <Link href="/kirana" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" /> Wholesale Kirana Catalog
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" /> Instant Quote Calculator
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" /> Event Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" /> Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Event Types */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">
              {t("footer_services")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" /> Royal Wedding Banquets
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" /> Traditional Walima Dawat
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" /> Engagement & Ring Ceremony
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" /> Aqiqah & Family Celebrations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" /> Bulk Kirana & Grocery Supply
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" /> Live Tandoor & Chaat Stalls
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">
              Get In Touch
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-1" />
                <span>{t("footer_address")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="tel:+917983319874" className="hover:text-white transition-colors">
                  +91 79833 19874 / +91 70178 67533
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="mailto:abuzzarkhan3z@gmail.com" className="hover:text-white transition-colors">
                  abuzzarkhan3z@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Open All 7 Days: 8:00 AM – 10:00 PM</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="text-xs text-gray-500 hover:text-[#d4af37] transition-colors underline"
                >
                  Admin & Staff Portal →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>{t("footer_copyright")}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
            <span>•</span>
            <Link href="/login" className="hover:text-[#d4af37]">Portal Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
