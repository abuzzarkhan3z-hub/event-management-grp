"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Utensils, Heart, Gift, Briefcase, Award, ArrowRight } from "lucide-react";

export default function CateringPage() {
  const { language } = useLanguage();

  const services = [
    {
      id: "wedding",
      title_en: "Wedding & Shadi Banquets",
      title_hi: "शाही शादी एवं रिसेप्शन",
      desc_en: "Full multi-course royal feasts, live chaat stalls, tandoori starters, slow-cooked Dum Biryani, and grand dessert spreads.",
      desc_hi: "शाही शादी के लिए लाइव काउंटर, तंदूरी स्टार्टर्स, दम बिरयानी और भव्य मिठाइयों की व्यवस्था।",
      guests: "300 - 5,000+ Guests",
    },
    {
      id: "walima",
      title_en: "Walima Dawat",
      title_hi: "वलीमा दावत",
      desc_en: "Traditional Awadhi Zafrani Biryani, melt-in-mouth Galawati kebabs, Badami Korma, and royal Shahi Tukda.",
      desc_hi: "पारंपरिक ज़ाफ़रानी बिरयानी, गलावटी कबाब, बादामी कोरमा और शाही टुकड़े की खास दावत।",
      guests: "250 - 3,000+ Guests",
    },
    {
      id: "engagement",
      title_en: "Engagement & Mangni",
      title_hi: "सगाई एवं मंगनी",
      desc_en: "Elegant lunch or dinner buffet with gourmet finger foods, live mocktails, and customized multi-cuisine delicacies.",
      desc_hi: "सगाई समारोह के लिए सुरुचिपूर्ण बुफे, मॉकटेल और स्वादिष्ट पकवान।",
      guests: "100 - 600 Guests",
    },
    {
      id: "aqiqah",
      title_en: "Aqiqah Celebrations",
      title_hi: "अक़ीक़ा दावत",
      desc_en: "Authentic sacrificial meat preparation following traditional halal customs, cooked to perfection with fragrant spices.",
      desc_hi: "पारंपरिक इस्लामी रीति-रिवाजों के अनुसार अक़ीक़ा के गोश्त की स्वादिष्ट और सम्मानजनक तैयारी।",
      guests: "100 - 1,000+ Guests",
    },
    {
      id: "birthday",
      title_en: "Birthdays & Family Milestones",
      title_hi: "जन्मदिन व पारिवारिक जलसे",
      desc_en: "Lively live food stalls (pasta, chaat, rolls, pav bhaji) with delicious party meals loved by kids and elders alike.",
      desc_hi: "बच्चों और बड़ों दोनों के पसंदीदा लाइव स्टॉल, चाट, रोल्स और स्वादिष्ट पार्टी मील।",
      guests: "50 - 300 Guests",
    },
    {
      id: "corporate",
      title_en: "Corporate Events & Seminars",
      title_hi: "कॉरपोरेट एवं व्यावसायिक आयोजन",
      desc_en: "Professional high-tea, executive boxed meals, and premium buffet lunches with prompt service and proper invoicing.",
      desc_hi: "कॉन्फ्रेंस व व्यावसायिक बैठकों के लिए समयबद्ध हाई-टी और बुफे लंच की व्यवस्था।",
      guests: "50 - 1,500 Guests",
    },
  ];

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
          {language === "en" ? "Celebrations Crafted With Passion" : "हर समारोह के लिए संपूर्ण व्यवस्था"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "Our Catering Services" : "हमारी कैटरिंग सेवाएं"}
        </h1>
        <p className="text-base text-gray-600">
          {language === "en"
            ? "Whether you're hosting an intimate family dinner or a grand 5,000-guest wedding, we bring culinary distinction to your table."
            : "चाहे 50 मेहमानों का पारिवारिक जलसा हो या 5,000 मेहमानों की शाही शादी, हम हर दावत को यादगार बनाते हैं।"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#0b2a1f]/10 text-xs font-bold text-[#0b2a1f]">
                {item.guests}
              </span>
              <h3 className="text-xl font-serif font-bold text-[#0b2a1f] group-hover:text-[#b89326] transition-colors">
                {language === "en" ? item.title_en : item.title_hi}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === "en" ? item.desc_en : item.desc_hi}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-6">
              <Link
                href={`/catering/${item.id}`}
                className="text-xs font-bold text-[#b89326] flex items-center gap-1 hover:underline"
              >
                {language === "en" ? "View Menu Options" : "मेनू विकल्प देखें"} <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={`/quote?event=${item.id}`}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#0b2a1f] gold-gradient-bg"
              >
                {language === "en" ? "Get Quote" : "कोटेशन"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
