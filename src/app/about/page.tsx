"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ShieldCheck, Heart, Award, Users, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
          {language === "en" ? "Our Legacy & Heritage" : "हमारी विरासत और परंपरा"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "The Abu Maaz Story" : "अबू माअज़ की कहानी"}
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          {language === "en"
            ? "Founded with an unwavering passion for authentic Awadhi and Mughlai culinary craftsmanship, Abu Maaz Event Management Group has been the region's trusted host for over 15 years."
            : "पारंपरिक स्वाद और शुद्धता के प्रति समर्पण के साथ स्थापित, अबू माअज़ इवेंट ग्रुप पिछले 15 वर्षों से शादी-ब्याह और समारोहों का विश्वसनीय नाम है।"}
        </p>
      </div>

      {/* Values & Promises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#0b2a1f] text-[#d4af37] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#0b2a1f]">
            {language === "en" ? "Pure Ingredients & Hygiene" : "शुद्ध सामग्री एवं स्वच्छता"}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {language === "en"
              ? "We use pure desi ghee, top-grade basmati rice, handpicked whole spices, and farm-fresh poultry and meats prepared in strictly inspected sanitary kitchens."
              : "हम केवल शुद्ध देसी घी, उच्च कोटि का बासमती चावल और ताज़ा सामग्री का उपयोग करते हैं।"}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#0b2a1f] text-[#d4af37] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#0b2a1f]">
            {language === "en" ? "Master Chefs & Bawarchis" : "उस्ताद बावर्ची"}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {language === "en"
              ? "Our legacy head chefs bring generational recipes for Zafrani Dum Biryani, Shahi Korma, melt-in-mouth kebabs, and exquisite sweet dishes."
              : "हमारे अनुभवी उस्ताद बावर्ची पारंपरिक और शाही ज़ायके के साथ हर दावत को यादगार बनाते हैं।"}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#0b2a1f] text-[#d4af37] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#0b2a1f]">
            {language === "en" ? "Guest First Hospitality" : "आत्मीय मेहमाननवाज़ी"}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {language === "en"
              ? "Every host deserves peace of mind. We ensure zero delays, courteous uniformed staff, and spotless event clean-up."
              : "हम हर आयोजन में समयबद्धता, शिष्ट स्टाफ़ और संपूर्ण व्यवस्था की गारंटी देते हैं।"}
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#0b2a1f] rounded-2xl p-8 sm:p-12 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold">
          {language === "en" ? "Ready To Plan Your Special Occasion?" : "क्या आप अपने आयोजन की योजना बनाने के लिए तैयार हैं?"}
        </h2>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/quote"
            className="px-6 py-3 rounded-xl font-bold text-sm text-[#0b2a1f] gold-gradient-bg"
          >
            {language === "en" ? "Get Free Quote" : "मुफ़्त कोटेशन प्राप्त करें"}
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl font-bold text-sm text-white border border-[#d4af37]"
          >
            {language === "en" ? "Contact Us" : "संपर्क करें"}
          </Link>
        </div>
      </div>
    </div>
  );
}
