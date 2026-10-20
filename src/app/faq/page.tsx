"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SAMPLE_FAQS } from "@/lib/sampleData";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const { language } = useLanguage();
  const [openIds, setOpenIds] = useState<{ [key: string]: boolean }>({ f1: true });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const extraFaqs = [
    {
      id: "f4",
      question_en: "What is the minimum number of guests for catering?",
      question_hi: "कैटरिंग के लिए न्यूनतम कितने मेहमान होने चाहिए?",
      answer_en: "Our standard full-service catering packages start from 100 guests. For smaller gatherings under 100, we provide bulk cooked food in traditional Handi / Deg containers for self-service.",
      answer_hi: "फुल-सर्विस कैटरिंग के लिए कम से कम 100 मेहमान होने चाहिए। 100 से कम के लिए हम हांडी / देग में पैक करके भोजन उपलब्ध कराते हैं।",
    },
    {
      id: "f5",
      question_en: "Do you supply grocery for events if we have our own cooks?",
      question_hi: "अगर हमारे पास अपने बावर्ची हों, तो क्या आप केवल राशन दे सकते हैं?",
      answer_en: "Yes, absolutely! We specialize in wholesale Kirana supply. You can order premium Basmati rice, A2 pure ghee, whole spices, flour, and pulses at wholesale rates delivered straight to your event venue.",
      answer_hi: "जी बिल्कुल! आप केवल थोक किराना राशन भी मंगवा सकते हैं। हम सीधे वेन्यू तक थोक भाव पर सामान पहुंचाते हैं।",
    },
    {
      id: "f6",
      question_en: "What areas and cities do you serve?",
      question_hi: "आप किन-किन शहरों में सेवाएं देते हैं?",
      answer_en: "We actively serve Lucknow, Kanpur, Barabanki, Sitapur, Unnao, Rae Bareli, and nearby districts. We also undertake destination wedding catering with advance notice.",
      answer_hi: "हम लखनऊ, कानपुर, बाराबंकी, सीतापुर, उन्नाव, रायबरेली और आसपास के सभी ज़िलों में सेवाएं देते हैं।",
    },
  ];

  const allFaqs = [...SAMPLE_FAQS, ...extraFaqs];

  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
          {language === "en" ? "Clear Answers" : "सामान्य प्रश्न"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले सवाल"}
        </h1>
        <p className="text-base text-gray-600">
          {language === "en"
            ? "Everything you need to know about booking dates, menu customization, advance payments, and bulk grocery delivery."
            : "बुकिंग प्रक्रिया, एडवांस पेमेंट, मेनू कस्टमाइज़ेशन और किराना डिलीवरी से जुड़े जरूरी जवाब।"}
        </p>
      </div>

      <div className="space-y-4">
        {allFaqs.map((faq) => {
          const isOpen = !!openIds[faq.id];
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#0b2a1f] hover:text-[#b89326] transition-colors"
              >
                <span>{language === "en" ? faq.question_en : faq.question_hi}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#b89326] shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                  {language === "en" ? faq.answer_en : faq.answer_hi}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-[#0b2a1f] text-white rounded-2xl p-8 text-center space-y-4">
        <h3 className="text-xl font-serif font-bold">
          {language === "en" ? "Still have a question?" : "क्या आपके पास कोई अन्य सवाल है?"}
        </h3>
        <p className="text-xs text-gray-300">
          {language === "en"
            ? "Abu Maa's management is always available to speak with you directly on phone or WhatsApp."
            : "हमारी टीम से सीधे बात करने के लिए कॉल या व्हाट्सएप करें।"}
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <a
            href="tel:+917983319874"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#0b2a1f] gold-gradient-bg flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[#0b2a1f]" /> +91 79833 19874
          </a>
        </div>
      </div>
    </div>
  );
}
