"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Lock, Phone, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [role, setRole] = useState<"customer" | "staff" | "admin">("customer");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "admin" || role === "staff") {
      router.push("/admin");
    } else {
      router.push("/kirana/order-list");
    }
  };

  return (
    <div className="py-16 sm:py-24 max-w-md mx-auto px-4 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] bg-[#0b2a1f] flex items-center justify-center text-[#d4af37] mx-auto shadow-lg">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b2a1f]">
          {language === "en" ? "Abu Maaz Portal Login" : "लॉगिन पोर्टल"}
        </h1>
        <p className="text-xs text-gray-500">
          {language === "en"
            ? "Sign in to track bookings, view quotations, manage staff, or stock"
            : "बुकिंग, कोटेशन और प्रबंधन के लिए लॉगिन करें"}
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg space-y-6">
        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              role === "customer" ? "bg-white text-[#0b2a1f] shadow-sm" : "text-gray-500"
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("staff")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              role === "staff" ? "bg-white text-[#0b2a1f] shadow-sm" : "text-gray-500"
            }`}
          >
            Staff
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              role === "admin" ? "bg-[#0b2a1f] text-white shadow-sm" : "text-gray-500"
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Registered Phone / Email
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password or OTP
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" className="accent-[#0b2a1f] rounded" defaultChecked />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:text-[#0b2a1f] underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-xs text-[#0b2a1f] gold-gradient-bg shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Log In as {role.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-gray-100 text-center text-xs text-gray-500">
          <span>Need admin or staff access? </span>
          <a href="tel:+917983319874" className="text-[#0b2a1f] font-semibold underline">
            Contact Owner
          </a>
        </div>
      </div>
    </div>
  );
}
