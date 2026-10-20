"use client";

import React from "react";
import { MessageCircle, PhoneCall } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingActions() {
  const { t } = useLanguage();
  const phone = "+917983319874";
  const whatsappUrl = `https://wa.me/917983319874?text=${encodeURIComponent(
    "Hello Abu Maa's Event Group! I would like to enquire about your catering services and kirana supply."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Quick Phone Call Button */}
      <a
        href={`tel:${phone}`}
        className="group flex items-center gap-2 bg-[#0b2a1f] text-[#d4af37] border border-[#d4af37]/40 px-3.5 py-2.5 rounded-full shadow-xl hover:bg-[#071c14] hover:scale-105 active:scale-95 transition-all"
        title="Direct Phone Call"
      >
        <PhoneCall className="w-5 h-5 text-[#d4af37] animate-pulse" />
        <span className="hidden sm:inline text-xs font-bold text-white pr-1">
          {t("call_now")}
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-300"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="text-sm font-bold tracking-wide">
          {t("whatsapp_chat")}
        </span>
      </a>
    </div>
  );
}
