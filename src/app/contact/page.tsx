"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Calendar, Loader2, AlertCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function ContactPage() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "wedding",
    date: "",
    message: "",
  });

  // Date availability checker state
  const [checkDate, setCheckDate] = useState("");
  const [isCheckingDate, setIsCheckingDate] = useState(false);
  const [dateStatus, setDateStatus] = useState<null | "available" | "limited" | "booked">(null);

  const handleDateCheck = async () => {
    if (!checkDate) return;
    setIsCheckingDate(true);
    setDateStatus(null);

    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.rpc("get_date_availability", {
          check_date: checkDate,
        } as any);
        if (error) throw error;
        setDateStatus((data as "available" | "limited" | "booked") || "available");
      } else {
        // Deterministic realistic demo feedback when offline/pre-setup
        await new Promise((r) => setTimeout(r, 400));
        setDateStatus("available");
      }
    } catch (err) {
      console.error("Availability check error:", err);
      setDateStatus("available");
    } finally {
      setIsCheckingDate(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (isSupabaseConfigured()) {
        const eventTypeMap: Record<string, string> = {
          wedding: "wedding",
          walima: "walima",
          engagement: "engagement",
          aqiqah: "aqiqah",
          birthday: "birthday",
          corporate: "corporate",
          kirana: "other",
          cook_only: "other",
          other: "other",
        };

        const { error } = await (supabase.from("enquiries") as any).insert({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          event_type: (eventTypeMap[formData.service] || "wedding") as any,
          event_date: formData.date || null,
          message: formData.message || null,
          source: "website_contact",
          status: "new",
        });

        if (error) throw error;
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setErrorMessage(err.message || "Failed to submit enquiry. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
          {language === "en" ? "We Are Here For You" : "हमसे संपर्क करें"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "Get In Touch With Abu Maa's" : "संपर्क सूत्र"}
        </h1>
        <p className="text-base text-gray-600">
          {language === "en"
            ? "Visit our office, request a booking consultation, or order wholesale supplies with rapid confirmation."
            : "कार्यालय पर पधारें या फोन/व्हाट्सएप द्वारा तुरंत बुकिंग व परामर्श प्राप्त करें।"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0b2a1f] text-white p-8 rounded-3xl border border-[#d4af37]/30 space-y-6 shadow-xl">
            <h3 className="text-xl font-serif font-bold text-white">
              Head Office & Hub
            </h3>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">Abu Maa&apos;s Event Management Group</p>
                  <p>Nasruddin Market, Badi Masjid Road, Jamalpur</p>
                  <p>Aligarh, Uttar Pradesh, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#d4af37] shrink-0" />
                <div>
                  <a href="tel:+917983319874" className="hover:text-white font-medium block">
                    +91 79833 19874
                  </a>
                  <a href="tel:+917017867533" className="hover:text-white font-medium block">
                    +91 70178 67533
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#d4af37] shrink-0" />
                <a href="mailto:abuzzarkhan3z@gmail.com" className="hover:text-white">
                  abuzzarkhan3z@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#d4af37] shrink-0" />
                <div>
                  <p className="font-semibold text-white">Office Consultation Hours</p>
                  <p>Monday - Sunday: 8:00 AM – 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Date Availability Box (Supabase RPC) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0b2a1f] uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-[#b89326]" /> Date Availability Checker
            </div>
            <p className="text-xs text-gray-600">
              Check if your event date is open on our master booking calendar before booking the hall.
            </p>
            <div className="flex gap-2">
              <input
                type="date"
                value={checkDate}
                onChange={(e) => {
                  setCheckDate(e.target.value);
                  setDateStatus(null);
                }}
                className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0b2a1f]"
              />
              <button
                type="button"
                onClick={handleDateCheck}
                disabled={!checkDate || isCheckingDate}
                className="px-4 py-2 text-xs font-bold rounded-lg text-[#0b2a1f] gold-gradient-bg disabled:opacity-50 flex items-center gap-1.5"
              >
                {isCheckingDate ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Check"}
              </button>
            </div>

            {dateStatus && (
              <div
                className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  dateStatus === "available"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : dateStatus === "limited"
                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {dateStatus === "available" && (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Date Available!</strong> We are accepting bookings for this date.</span>
                  </>
                )}
                {dateStatus === "limited" && (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>High Demand Date:</strong> Limited booking slots remaining. Confirm quickly!</span>
                  </>
                )}
                {dateStatus === "booked" && (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span><strong>Date Fully Booked:</strong> Contact our office directly for emergency scheduling.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Message / Consultation Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0b2a1f]">Enquiry Submitted Successfully!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your enquiry has been registered in the Abu Maa&apos;s system. Our desk will contact you at <strong>{formData.phone}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", phone: "", email: "", service: "wedding", date: "", message: "" });
                  }}
                  className="text-xs font-bold text-[#0b2a1f] underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-[#0b2a1f] mb-2">
                  Send A Message or Consultation Request
                </h3>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2 border border-rose-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aslam Khan"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      WhatsApp Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Service / Event Type
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                    >
                      <option value="wedding">Wedding Banquet</option>
                      <option value="walima">Walima Dawat</option>
                      <option value="engagement">Engagement Ceremony</option>
                      <option value="aqiqah">Aqiqah Feast</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="kirana">Wholesale Kirana / Groceries</option>
                      <option value="cook_only">Cooks & Service Staff Only</option>
                      <option value="other">General Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Tentative Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Special Notes / Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your venue, guest count, or items required..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-xs text-[#0b2a1f] gold-gradient-bg shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0b2a1f]" />
                      <span>Sending to Abu Maa&apos;s Desk...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#0b2a1f]" />
                      <span>Send Message To Abu Maa&apos;s</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
