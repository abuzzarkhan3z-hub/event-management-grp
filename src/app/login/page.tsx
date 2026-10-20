"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Lock, Mail, Sparkles, ArrowRight, AlertCircle, Loader2, UserCheck, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function LoginPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<"customer" | "staff" | "admin">("admin");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (isSupabaseConfigured()) {
        if (isSignUp) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                phone: phone,
              },
            },
          });
          if (error) throw error;
          setSuccessMessage("Account created! Check your email or log in directly.");
          setIsSignUp(false);
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;

          // Fetch user profile to verify role
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();

          const userRole = (profile as any)?.role || "customer";
          if (userRole === "admin" || userRole === "manager" || userRole === "staff") {
            router.push("/admin");
          } else {
            router.push("/kirana/order-list");
          }
        }
      } else {
        // Fallback for local preview before Supabase keys are entered
        await new Promise((r) => setTimeout(r, 400));
        if (role === "admin" || role === "staff") {
          router.push("/admin");
        } else {
          router.push("/kirana/order-list");
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setErrorMessage(err.message || "Authentication failed. Check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 sm:py-24 max-w-md mx-auto px-4 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] bg-[#0b2a1f] flex items-center justify-center text-[#d4af37] mx-auto shadow-lg">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b2a1f]">
          {isSignUp ? "Create Abu Maa's Account" : language === "en" ? "Abu Maa's Portal Login" : "लॉगिन पोर्टल"}
        </h1>
        <p className="text-xs text-gray-500">
          {language === "en"
            ? "Sign in to track bookings, view quotations, manage staff, or stock"
            : "बुकिंग, कोटेशन और प्रबंधन के लिए लॉगिन करें"}
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg space-y-6">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2 border border-rose-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 border border-emerald-200">
            <UserCheck className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Role Selector Tabs (For Preview / Intent) */}
        {!isSignUp && (
          <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                role === "admin" ? "bg-[#0b2a1f] text-white shadow-sm" : "text-gray-500"
              }`}
            >
              Admin
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
              onClick={() => setRole("customer")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                role === "customer" ? "bg-white text-[#0b2a1f] shadow-sm" : "text-gray-500"
              }`}
            >
              Customer
            </button>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tariq Mahmood"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@abumaaz.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-bold text-xs text-[#0b2a1f] gold-gradient-bg shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0b2a1f]" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{isSignUp ? "Create Account" : `Log In as ${role.toUpperCase()}`}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className="text-[#0b2a1f] font-semibold underline hover:text-[#b89326]"
          >
            {isSignUp ? "Already have an account? Log In" : "Need an account? Register"}
          </button>

          <a href="tel:+917983319874" className="text-gray-400 hover:text-gray-600">
            Contact Owner
          </a>
        </div>
      </div>
    </div>
  );
}
