"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SAMPLE_PACKAGES } from "@/lib/sampleData";
import { formatINR } from "@/lib/utils";
import { Check, Sparkles, Utensils, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MenuPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "non-veg" | "veg">("all");

  const filteredPackages = SAMPLE_PACKAGES.filter((p) => {
    if (activeTab === "all") return true;
    return p.type === activeTab || p.type === "mixed";
  });

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
          {language === "en" ? "Curated Gastronomy" : "शाही दावत मेनू"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "Catering Menus & Packages" : "मेनू एवं पैकेज"}
        </h1>
        <p className="text-base text-gray-600">
          {language === "en"
            ? "Transparent per-plate rates with premium ingredients. All packages can be tailored to your guest preferences."
            : "पारदर्शी प्रति-प्लेट दरें और शुद्ध सामग्री। सभी पैकेज आपकी पसंद अनुसार बदले जा सकते हैं।"}
        </p>

        {/* Filter Pills */}
        <div className="inline-flex p-1 bg-white rounded-xl border border-gray-200 shadow-sm mt-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "all" ? "bg-[#0b2a1f] text-white shadow" : "text-gray-600 hover:text-black"
            }`}
          >
            All Packages
          </button>
          <button
            onClick={() => setActiveTab("non-veg")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "non-veg" ? "bg-[#0b2a1f] text-white shadow" : "text-gray-600 hover:text-black"
            }`}
          >
            Non-Veg / Mughlai
          </button>
          <button
            onClick={() => setActiveTab("veg")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "veg" ? "bg-[#0b2a1f] text-white shadow" : "text-gray-600 hover:text-black"
            }`}
          >
            Pure Vegetarian
          </button>
        </div>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-3xl p-8 border ${
              pkg.popular ? "border-[#d4af37] shadow-xl relative" : "border-gray-200/80 shadow-sm"
            } flex flex-col justify-between`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-8 bg-[#d4af37] text-[#0b2a1f] text-[10px] font-black uppercase px-3 py-1 rounded-full">
                Most Selected
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#0b2a1f]">
                  {language === "en" ? pkg.name : pkg.name_hi}
                </h3>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
                  Type: {pkg.type.toUpperCase()}
                </p>
              </div>

              <div className="flex items-baseline gap-1.5 pb-4 border-b border-gray-100">
                <span className="text-4xl font-serif font-extrabold text-[#d4af37]">
                  {formatINR(pkg.price_per_plate)}
                </span>
                <span className="text-xs text-gray-500">/ plate (minimum 100 guests)</span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {language === "en" ? pkg.description_en : pkg.description_hi}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#0b2a1f] uppercase tracking-wider">
                  Included Courses & Dishes:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {(language === "en" ? pkg.items_en : pkg.items_hi).map((dish, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href={`/quote?package=${pkg.id}`}
                className="w-full block py-3 rounded-xl text-center text-sm font-bold text-[#0b2a1f] gold-gradient-bg shadow hover:brightness-105 transition-all"
              >
                {language === "en" ? "Customize & Calculate Cost" : "कस्टमाइज़ व कोटेशन देखें"}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Menu Banner */}
      <div className="bg-[#f2f8f5] border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
        <h3 className="text-xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "Want A Fully Custom Menu?" : "क्या आपको पूरी तरह से अपनी पसंद का मेनू चाहिए?"}
        </h3>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          {language === "en"
            ? "We can accommodate special family recipes, live counters (pasta, chaat, barbecue), and diet preferences."
            : "हम आपकी पारिवारिक पसंद, विशेष व्यंजन और लाइव स्टॉल के अनुसार मेनू तैयार करते हैं।"}
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0b2a1f] hover:bg-[#071c14]"
          >
            {language === "en" ? "Speak With Our Head Chef" : "शेफ से बात करें"} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
