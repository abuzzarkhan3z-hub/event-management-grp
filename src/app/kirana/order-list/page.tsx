"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function KiranaOrderListPage() {
  const { language } = useLanguage();
  const { items, updateQuantity, removeItem, clearCart, totalEstimatedAmount } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderNumber, setOrderNumber] = useState<string>("");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    dateNeeded: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (isSupabaseConfigured()) {
        const orderItemsPayload = items.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
        }));

        const { data, error } = await supabase.rpc("submit_grocery_request", {
          p_name: customer.name,
          p_phone: customer.phone,
          p_address: customer.address,
          p_required_date: customer.dateNeeded,
          p_notes: customer.notes || "Bulk supply request from website",
          p_items: orderItemsPayload as any,
        } as any);

        if (error) {
          // If RPC fails (e.g. products not yet migrated to UUIDs), fallback to direct table insert
          console.warn("RPC submit_grocery_request error, trying table fallback:", error);
          const { data: orderData, error: orderErr } = await (supabase
            .from("orders") as any)
            .insert({
              order_type: "grocery",
              guest_name: customer.name,
              guest_phone: customer.phone,
              delivery_address: customer.address,
              required_date: customer.dateNeeded,
              notes: customer.notes || "Bulk grocery request",
              total_amount: totalEstimatedAmount,
              status: "requested",
            })
            .select("order_number")
            .single();

          if (orderErr) throw orderErr;
          setOrderNumber(orderData?.order_number || "ORD-PENDING");
        } else {
          setOrderNumber((data as string) || "ORD-CONFIRMED");
        }
      } else {
        // Deterministic mock order number for offline preview
        setOrderNumber(`ORD-${Math.floor(10000 + Math.random() * 90000)}`);
      }

      setSubmitted(true);
      clearCart();
    } catch (err: any) {
      console.error("Order submission error:", err);
      setErrorMessage(err.message || "Failed to submit bulk order request. Please contact us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#0b2a1f]">
          Bulk Order Request Received!
        </h1>
        {orderNumber && (
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#fcfaf2] border border-[#d4af37] text-xs font-bold text-[#0b2a1f]">
            Tracking ID: {orderNumber}
          </div>
        )}
        <p className="text-sm text-gray-600 leading-relaxed">
          Thank you, <strong>{customer.name}</strong>. Abu Maa&apos;s Kirana supply desk has logged your requirement and will calculate the exact wholesale freight discount. The quotation will be sent to <strong>{customer.phone}</strong> on WhatsApp.
        </p>
        <div className="pt-6">
          <Link
            href="/kirana"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#0b2a1f] gold-gradient-bg shadow-md"
          >
            Browse More Products
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#0b2a1f]">Your Order List Is Empty</h2>
        <p className="text-sm text-gray-500">
          Browse our wholesale Kirana supply catalog and add grains, oils, and spices for your upcoming event.
        </p>
        <div className="pt-4">
          <Link
            href="/kirana"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#0b2a1f]"
          >
            Go to Kirana Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <Link
        href="/kirana"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#0b2a1f]"
      >
        <ArrowLeft className="w-4 h-4" /> Continue Adding Products
      </Link>

      <div className="flex justify-between items-baseline border-b border-gray-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b2a1f]">
          Review Wholesale Order List
        </h1>
        <span className="text-xs text-gray-500">
          {items.length} unique items selected
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Items List */}
        <div className="lg:col-span-7 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-base text-[#0b2a1f]">
                  {language === "en" ? product.name_en : product.name_hi}
                </h4>
                <p className="text-xs text-gray-500">
                  {formatINR(product.price)} per {product.unit} (Min order: {product.min_qty} {product.unit})
                </p>
                <p className="text-xs font-bold text-[#b89326]">
                  Item Total: {formatINR(product.price * quantity)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, Math.max(product.min_qty, quantity - 5))}
                    className="p-1.5 hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#0b2a1f]">
                    {quantity} {product.unit}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 5)}
                    className="p-1.5 hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Checkout & Delivery Details */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#0b2a1f]">
              Delivery Details & Submission
            </h3>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2 border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
              <span className="text-gray-500">Estimated Total:</span>
              <span className="font-serif font-bold text-lg text-[#0b2a1f]">
                {formatINR(totalEstimatedAmount)}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="e.g. Haji Rashid"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  WhatsApp Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Delivery Venue / Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Town, Marriage Hall or Kitchen address"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Required Delivery Date *
                </label>
                <input
                  type="date"
                  required
                  value={customer.dateNeeded}
                  onChange={(e) => setCustomer({ ...customer, dateNeeded: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Order Notes / Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="e.g. Basmati Rice grade preferred, unloading at 7 AM"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#0b2a1f] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0b2a1f] gold-gradient-bg shadow hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0b2a1f]" />
                    <span>Transmitting Order to Kirana Hub...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#0b2a1f]" />
                    <span>Submit Bulk Order Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
