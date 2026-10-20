"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SAMPLE_PACKAGES, SAMPLE_TESTIMONIALS } from "@/lib/sampleData";
import { formatINR } from "@/lib/utils";
import {
  Sparkles,
  Utensils,
  ShoppingBag,
  Calculator,
  Calendar,
  Users,
  Award,
  ShieldCheck,
  Star,
  CheckCircle,
  ArrowRight,
  PhoneCall,
  Send,
} from "lucide-react";

export default function HomePage() {
  const { language, t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "wedding",
    date: "",
    guests: "300",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative green-gradient-bg text-white py-20 lg:py-28 overflow-hidden border-b border-[#d4af37]/30">
        {/* Subtle decorative background patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/50 bg-[#071c14]/60 text-xs sm:text-sm font-medium text-[#f3dc8e] shadow-sm">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Abu Maa&apos;s Event Management & Wholesale Kirana</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
                {language === "en" ? (
                  <>
                    Exceptional Catering &{" "}
                    <span className="gold-gradient-text">Wholesale Groceries</span> For Grand Occasions
                  </>
                ) : (
                  <>
                    शाही दावत और{" "}
                    <span className="gold-gradient-text">थोक किराना</span> - आपके हर खास मौके के लिए
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t("hero_subtitle")}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-[#0b2a1f] gold-gradient-bg shadow-xl hover:brightness-105 active:scale-95 transition-all"
                >
                  <Calculator className="w-5 h-5 text-[#0b2a1f]" />
                  {t("calculate_instant_quote")}
                </Link>

                <Link
                  href="/kirana"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white border border-[#d4af37]/60 hover:bg-[#d4af37]/15 transition-all"
                >
                  <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                  {language === "en" ? "Explore Kirana Catalog" : "थोक किराना देखें"}
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-center">
                <div>
                  <p className="text-2xl font-bold font-serif text-[#f3dc8e]">500+</p>
                  <p className="text-xs text-gray-300">Events Managed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif text-[#f3dc8e]">15+ Yrs</p>
                  <p className="text-xs text-gray-300">Mastery</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif text-[#f3dc8e]">3 Lakh+</p>
                  <p className="text-xs text-gray-300">Guests Served</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif text-[#f3dc8e]">100%</p>
                  <p className="text-xs text-gray-300">Halal & Fresh</p>
                </div>
              </div>
            </div>

            {/* Right: Quick Quote Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-[#1a201c] shadow-2xl border-2 border-[#d4af37]/40 relative">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#0b2a1f]">
                      {language === "en" ? "Quick Enquiry" : "त्वरित पूछताछ"}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {language === "en" ? "Get instant price estimate & callback" : "तुरंत अनुमान व सहायता प्राप्त करें"}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#0b2a1f]/10 text-xs font-bold text-[#0b2a1f]">
                    Fast Reply
                  </span>
                </div>

                {formSubmitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b2a1f]">
                      {language === "en" ? "Thank You!" : "धन्यवाद!"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === "en"
                        ? "We received your enquiry. Abu Maa's team will contact you within 15 minutes."
                        : "आपकी पूछताछ प्राप्त हो गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।"}
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-bold text-[#0b2a1f] underline pt-2"
                    >
                      {language === "en" ? "Send another enquiry" : "दूसरी पूछताछ भेजें"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {language === "en" ? "Your Name *" : "आपका नाम *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Mohammad Tariq"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2a1f]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {language === "en" ? "Phone Number (WhatsApp) *" : "फ़ोन नंबर (व्हाट्सएप) *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2a1f]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          {language === "en" ? "Event Type" : "समारोह"}
                        </label>
                        <select
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0b2a1f]"
                        >
                          <option value="wedding">Wedding / शादी</option>
                          <option value="walima">Walima / वलीमा</option>
                          <option value="engagement">Engagement / सगाई</option>
                          <option value="aqiqah">Aqiqah / अक़ीक़ा</option>
                          <option value="kirana">Only Kirana Supply</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          {language === "en" ? "Est. Guests" : "मेहमान"}
                        </label>
                        <input
                          type="number"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2a1f]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-bold text-sm text-[#0b2a1f] gold-gradient-bg shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <Send className="w-4 h-4 text-[#0b2a1f]" />
                      {language === "en" ? "Request Free Quote" : "मुफ़्त कोटेशन प्राप्त करें"}
                    </button>
                    <p className="text-[11px] text-gray-400 text-center">
                      🔒 No spam. 100% confidential and verified rates.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW */}
      <section className="py-16 sm:py-24 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
              {language === "en" ? "What We Offer" : "हमारी सेवाएं"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0b2a1f]">
              {t("catering_heading")} & Kirana Supply
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {t("catering_subheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Wedding Catering */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0b2a1f] text-[#d4af37] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0b2a1f]">
                  {language === "en" ? "Wedding & Walima Banquets" : "शाही शादी एवं वलीमा दावत"}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Grand feasts featuring authentic Zafrani Dum Biryani, Galawati Kebabs, Sheermal, and traditional dessert counters designed for 200 to 5,000+ guests.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#b89326]">Custom Menu Available</span>
                <Link href="/catering" className="text-sm font-bold text-[#0b2a1f] flex items-center gap-1 group-hover:text-[#b89326]">
                  Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Wholesale Kirana Supply */}
            <div className="bg-white rounded-2xl p-6 border border-[#d4af37]/40 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#d4af37] text-[#0b2a1f] text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg">
                Wholesale Hub
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0b2a1f] text-[#d4af37] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0b2a1f]">
                  {language === "en" ? "Bulk Kirana Supply" : "थोक किराना राशन सप्लाई"}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Bulk flour, basmati rice, pure desi ghee, premium pulses, oils, dry fruits, and packaging supplies delivered directly to your kitchen or venue at wholesale rates.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#b89326]">Doorstep Delivery</span>
                <Link href="/kirana" className="text-sm font-bold text-[#0b2a1f] flex items-center gap-1 group-hover:text-[#b89326]">
                  Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3: Interactive Quote Calculator */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0b2a1f] text-[#d4af37] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0b2a1f]">
                  {language === "en" ? "Instant Cost Calculator" : "तुरंत लागत कैलकुलेटर"}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Calculate estimated budget in seconds by adjusting guest count, menu items, and optional live stalls. Instant transparent pricing without hidden surprises.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#b89326]">Free & Instant</span>
                <Link href="/quote" className="text-sm font-bold text-[#0b2a1f] flex items-center gap-1 group-hover:text-[#b89326]">
                  Calculate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR PACKAGES PREVIEW */}
      <section className="py-16 sm:py-24 bg-white border-y border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
                {language === "en" ? "Curated Menus" : "लोकप्रिय पैकेज"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0b2a1f]">
                {language === "en" ? "Popular Catering Packages" : "हमारे सबसे पसंदीदा पैकेज"}
              </h2>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0b2a1f] hover:text-[#b89326] transition-colors"
            >
              {language === "en" ? "View Full Menu & Custom Packages" : "पूरा मेनू देखें"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SAMPLE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? "bg-[#0b2a1f] text-white shadow-2xl scale-[1.02] border-2 border-[#d4af37]"
                    : "bg-[#fbf9f5] text-[#1a201c] border border-gray-200 hover:shadow-lg"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 gold-gradient-bg text-[#0b2a1f] text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`text-xl font-serif font-bold ${pkg.popular ? "text-white" : "text-[#0b2a1f]"}`}>
                      {language === "en" ? pkg.name : pkg.name_hi}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold font-serif text-[#d4af37]">
                      {formatINR(pkg.price_per_plate)}
                    </span>
                    <span className={`text-xs ${pkg.popular ? "text-gray-300" : "text-gray-500"}`}>
                      {t("per_plate")}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${pkg.popular ? "text-gray-300" : "text-gray-600"}`}>
                    {language === "en" ? pkg.description_en : pkg.description_hi}
                  </p>

                  <div className="pt-4 border-t border-gray-200/30 space-y-2">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${pkg.popular ? "text-[#f3dc8e]" : "text-gray-700"}`}>
                      Sample Inclusions:
                    </span>
                    <ul className="space-y-1.5 text-xs">
                      {(language === "en" ? pkg.items_en : pkg.items_hi).slice(0, 5).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${pkg.popular ? "text-[#d4af37]" : "text-emerald-700"}`} />
                          <span className={pkg.popular ? "text-gray-200" : "text-gray-700"}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={`/quote?package=${pkg.id}`}
                    className={`w-full py-3 rounded-xl text-center text-sm font-bold block transition-all ${
                      pkg.popular
                        ? "gold-gradient-bg text-[#0b2a1f] hover:brightness-105 shadow-md"
                        : "bg-[#0b2a1f] text-white hover:bg-[#071c14]"
                    }`}
                  >
                    {language === "en" ? "Select Package & Get Quote" : "यह पैकेज चुनें"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CUSTOMER TESTIMONIALS */}
      <section className="py-16 sm:py-24 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
              {language === "en" ? "Verified Reviews" : "संतुष्ट ग्राहक"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0b2a1f]">
              {language === "en" ? "What Our Hosts Say" : "हमारे ग्राहकों का विश्वास"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SAMPLE_TESTIMONIALS.map((tItem) => (
              <div
                key={tItem.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#d4af37]">
                    {[...Array(tItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    &ldquo;{language === "en" ? tItem.quote_en : tItem.quote_hi}&rdquo;
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm font-bold text-[#0b2a1f]">{tItem.name}</p>
                  <p className="text-xs text-[#b89326] font-medium">{tItem.event_type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DIRECT CALLOUT CTA */}
      <section className="bg-[#0b2a1f] text-white py-16 border-t border-[#d4af37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold">
            {language === "en"
              ? "Planning An Upcoming Wedding Or Need Bulk Groceries?"
              : "शादी की तैयारी कर रहे हैं या थोक राशन चाहिए?"}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            {language === "en"
              ? "Call Abu Maa's directly or message us on WhatsApp for custom menus, date availability, and wholesale rates."
              : "कस्टम मेनू और तारीख की उपलब्धता के लिए अभी अबू मा'स से संपर्क करें।"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="tel:+917983319874"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#d4af37] text-white hover:bg-[#d4af37]/20 font-bold text-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#d4af37]" />
              +91 79833 19874
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient-bg text-[#0b2a1f] font-bold text-sm hover:brightness-105"
            >
              {language === "en" ? "Visit Office / Contact Form" : "संपर्क करें"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
