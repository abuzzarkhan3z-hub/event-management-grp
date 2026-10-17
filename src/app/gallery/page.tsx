"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState("all");

  const galleryItems = [
    { id: 1, title: "Royal Wedding Dawat Buffet", category: "wedding", subtitle: "1200 Guests - Lucknow Hall" },
    { id: 2, title: "Awadhi Zafrani Dum Biryani Deg", category: "food", subtitle: "Slow cooked over coal embers" },
    { id: 3, title: "Live Chaat & Golgappa Stall", category: "counters", subtitle: "Freshly prepared delicacies" },
    { id: 4, title: "Galawati Kebab & Roomali Roti", category: "food", subtitle: "Mouth-melting Mughlai starters" },
    { id: 5, title: "Royal Dessert Display", category: "food", subtitle: "Shahi Tukda, Matka Kulfi, Halwa" },
    { id: 6, title: "Grand Walima Dining Hall", category: "wedding", subtitle: "Uniformed service staff" },
    { id: 7, title: "Wholesale Basmati & Ghee Storage", category: "kirana", subtitle: "Pure bulk raw material warehouse" },
    { id: 8, title: "Fruit Mocktail & Welcome Counter", category: "counters", subtitle: "Refreshing welcome station" },
  ];

  const filtered = galleryItems.filter((item) => filter === "all" || item.category === filter);

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
          {language === "en" ? "Visual Feast" : "हमारी झलकियां"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "Event & Culinary Gallery" : "गैलरी"}
        </h1>
        <p className="text-base text-gray-600">
          {language === "en"
            ? "A glimpse of real weddings, live buffet counters, royal deg preparation, and wholesale grocery supply."
            : "शाही शादियों, लाइव काउंटरों और हमारे बावर्ची खानों की कुछ खास तस्वीरें।"}
        </p>

        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {["all", "wedding", "food", "counters", "kirana"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                filter === f
                  ? "bg-[#0b2a1f] text-white shadow"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#0b2a1f]/5 rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm aspect-4/3 flex flex-col justify-end p-5 hover:shadow-xl transition-all"
          >
            {/* Background representation with subtle deep green pattern */}
            <div className="absolute inset-0 green-gradient-bg opacity-90 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-[#d4af37]/40" />
            </div>

            <div className="relative z-10 space-y-1 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] bg-black/40 px-2 py-0.5 rounded">
                {item.category}
              </span>
              <h3 className="text-sm font-serif font-bold text-white group-hover:text-[#f3dc8e] transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-gray-300">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
