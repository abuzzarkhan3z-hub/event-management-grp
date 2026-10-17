"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SAMPLE_TESTIMONIALS } from "@/lib/sampleData";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function TestimonialsPage() {
  const { language } = useLanguage();

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
          {language === "en" ? "Real Words From Real Hosts" : "सच्चे अनुभव"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "Customer Reviews & Testimonials" : "ग्राहक समीक्षा"}
        </h1>
        <p className="text-base text-gray-600">
          {language === "en"
            ? "Trusted by hundreds of families and organizations across the state for catering excellence and wholesale grocery fulfillment."
            : "सैकड़ों परिवारों और संस्थाओं का अटूट भरोसा और उनके अनुभव।"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SAMPLE_TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-[#d4af37]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <MessageSquareQuote className="w-8 h-8 text-[#d4af37]/30" />
              </div>

              <p className="text-sm text-gray-700 leading-relaxed italic">
                &ldquo;{language === "en" ? t.quote_en : t.quote_hi}&rdquo;
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 mt-6">
              <div className="flex items-center gap-2">
                <h4 className="font-serif font-bold text-base text-[#0b2a1f]">{t.name}</h4>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
              <p className="text-xs text-[#b89326] font-medium mt-0.5">{t.event_type}</p>
              <p className="text-[11px] text-gray-400 mt-1">{t.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#f2f8f5] rounded-2xl p-8 border border-emerald-200 text-center max-w-2xl mx-auto space-y-3">
        <h3 className="text-xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "Were You A Recent Guest Or Host?" : "क्या आपने हाल ही में हमारी सेवा ली है?"}
        </h3>
        <p className="text-xs text-gray-600">
          {language === "en"
            ? "We would love to hear your feedback on our biryani, service staff, or grocery delivery."
            : "कृपया हमारे स्वाद और व्यवस्था पर अपनी बहुमूल्य राय साझा करें।"}
        </p>
        <Link
          href="/contact"
          className="inline-block px-5 py-2.5 rounded-lg text-xs font-bold text-[#0b2a1f] gold-gradient-bg"
        >
          Submit Review
        </Link>
      </div>
    </div>
  );
}
