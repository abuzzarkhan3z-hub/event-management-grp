"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SAMPLE_PACKAGES } from "@/lib/sampleData";
import { formatINR } from "@/lib/utils";
import { Calculator, CheckCircle, Sparkles, Send, PhoneCall, Loader2, AlertCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function QuoteCalculatorPage() {
  const { language } = useLanguage();
  const [eventType, setEventType] = useState("wedding");
  const [selectedPackageId, setSelectedPackageId] = useState("gold-package");
  const [guestCount, setGuestCount] = useState<number>(400);
  const [addOns, setAddOns] = useState<{ [key: string]: boolean }>({
    liveChaat: true,
    mocktailBar: false,
    extraWaiters: true,
    decoration: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contact, setContact] = useState({ name: "", phone: "", date: "", city: "" });

  const activePackage = SAMPLE_PACKAGES.find((p) => p.id === selectedPackageId) || SAMPLE_PACKAGES[0];

  const addOnPrices: { [key: string]: { label_en: string; label_hi: string; cost: number } } = {
    liveChaat: { label_en: "Live Delhi Chaat & Golgappa Stall", label_hi: "लाइव दिल्ली चाट व गोलगप्पा स्टॉल", cost: 15000 },
    mocktailBar: { label_en: "Live Fruit Mocktail & Juice Bar", label_hi: "लाइव फ्रूट मॉकटेल बार", cost: 18000 },
    extraWaiters: { label_en: "Dedicated Premium Uniformed Waiters", label_hi: "प्रीमियम यूनिफ़ॉर्म वेटर व्यवस्था", cost: 8000 },
    decoration: { label_en: "Royal Floral Stage & Dining Setup", label_hi: "शाही स्टेज एवं डाइनिंग डेकोरेशन", cost: 35000 },
  };

  const calculateAddonTotal = () => {
    let sum = 0;
    Object.keys(addOns).forEach((key) => {
      if (addOns[key]) {
        sum += addOnPrices[key].cost;
      }
    });
    return sum;
  };

  const foodTotal = activePackage.price_per_plate * guestCount;
  const addonsTotal = calculateAddonTotal();
  const grandTotal = foodTotal + addonsTotal;
  const lowerEstimate = Math.round(grandTotal * 0.95);
  const upperEstimate = Math.round(grandTotal * 1.05);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (isSupabaseConfigured()) {
        const selectedAddonLabels = Object.entries(addOns)
          .filter(([_, checked]) => checked)
          .map(([key]) => addOnPrices[key]?.label_en)
          .join(", ");

        const notes = `Estimated: ${formatINR(lowerEstimate)} - ${formatINR(upperEstimate)} | Package: ${activePackage.name} (${formatINR(activePackage.price_per_plate)}/plate) | Guests: ${guestCount} | Add-ons: ${selectedAddonLabels || "None"}`;

        const { error } = await (supabase.from("enquiries") as any).insert({
          name: contact.name,
          phone: contact.phone,
          event_type: eventType as any,
          event_date: contact.date || null,
          guests: guestCount,
          city: contact.city || null,
          message: notes,
          source: "quote_calculator",
          status: "new",
        });

        if (error) throw error;
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Quote submit error:", err);
      setErrorMessage(err.message || "Failed to submit estimate request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
          {language === "en" ? "Transparent Budget Estimator" : "पारदर्शी बजट कैलकुलेटर"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "Instant Quote Calculator" : "तुरंत कोटेशन कैलकुलेटर"}
        </h1>
        <p className="text-base text-gray-600">
          {language === "en"
            ? "Configure your guest count, choice of feast, and optional live counters to view an accurate price range."
            : "मेहमानों की संख्या, पसंदीदा मेनू और लाइव काउंटर चुनकर तुरंत अनुमानित खर्च देखें।"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Inputs & Configurations */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm">
          {/* 1. Event Type */}
          <div>
            <label className="block text-sm font-bold text-[#0b2a1f] mb-2">
              1. Select Event Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["wedding", "walima", "engagement", "aqiqah", "birthday", "corporate"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEventType(type)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                    eventType === type
                      ? "bg-[#0b2a1f] text-white border-[#0b2a1f]"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Guest Count Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[#0b2a1f]">
                2. Expected Guest Count
              </label>
              <span className="text-lg font-serif font-bold text-[#b89326]">
                {guestCount} Guests
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="2500"
              step="50"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full accent-[#0b2a1f] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>100 guests</span>
              <span>500 guests</span>
              <span>1000 guests</span>
              <span>2500+ guests</span>
            </div>
          </div>

          {/* 3. Package Selection */}
          <div>
            <label className="block text-sm font-bold text-[#0b2a1f] mb-3">
              3. Select Feast Package
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPackageId === pkg.id
                      ? "border-[#d4af37] bg-[#fcfaf2]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-serif font-bold text-sm text-[#0b2a1f]">{pkg.name}</p>
                  <p className="text-sm font-bold text-[#d4af37] mt-1">
                    {formatINR(pkg.price_per_plate)} / plate
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Optional Live Stalls & Add-ons */}
          <div>
            <label className="block text-sm font-bold text-[#0b2a1f] mb-3">
              4. Optional Live Counters & Enhancements
            </label>
            <div className="space-y-2.5">
              {Object.keys(addOnPrices).map((key) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addOns[key]}
                      onChange={(e) => setAddOns({ ...addOns, [key]: e.target.checked })}
                      className="w-4 h-4 accent-[#0b2a1f] rounded"
                    />
                    <span className="text-xs font-semibold text-gray-800">
                      {language === "en" ? addOnPrices[key].label_en : addOnPrices[key].label_hi}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#b89326]">
                    +{formatINR(addOnPrices[key].cost)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Instant Estimate Card & Request Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-[#0b2a1f] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#d4af37]/40 shadow-2xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#f3dc8e] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#d4af37]" /> Approximate Cost Range
            </div>

            <div className="space-y-1 border-b border-white/10 pb-6">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                {formatINR(lowerEstimate)} – {formatINR(upperEstimate)}
              </span>
              <p className="text-xs text-gray-400">
                Based on {guestCount} guests x {formatINR(activePackage.price_per_plate)}/plate + add-ons.
              </p>
            </div>

            {submitted ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-white/10 text-[#d4af37] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-lg text-white">Estimate Sent!</h4>
                <p className="text-xs text-gray-300">
                  Your quote calculation has been saved in Abu Maa&apos;s management system. Our team will contact {contact.phone} on WhatsApp with the finalized itemized quotation.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setContact({ name: "", phone: "", date: "", city: "" });
                  }}
                  className="text-xs text-[#d4af37] underline pt-2 block mx-auto"
                >
                  Calculate Another Estimate
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="text-xs text-gray-300 font-medium">
                  Enter your details to receive an official PDF quotation on WhatsApp:
                </p>

                {errorMessage && (
                  <div className="p-2.5 rounded-lg bg-rose-500/20 text-rose-200 text-xs flex items-center gap-2 border border-rose-500/40">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Phone Number *"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    required
                    value={contact.date}
                    onChange={(e) => setContact({ ...contact, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="text"
                    placeholder="City / Venue"
                    value={contact.city}
                    onChange={(e) => setContact({ ...contact, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-bold text-xs text-[#0b2a1f] gold-gradient-bg shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0b2a1f]" />
                      <span>Saving Estimate...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#0b2a1f]" />
                      <span>Send Estimate To Abu Maa&apos;s Desk</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span>Have immediate questions?</span>
              <a href="tel:+917983319874" className="text-[#f3dc8e] font-semibold flex items-center gap-1 hover:underline">
                <PhoneCall className="w-3.5 h-3.5 text-[#d4af37]" /> Call Direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
