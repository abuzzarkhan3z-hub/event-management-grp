"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function KiranaOrderListPage() {
  const { language } = useLanguage();
  const { items, updateQuantity, removeItem, clearCart, totalEstimatedAmount } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    dateNeeded: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
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
        <p className="text-sm text-gray-600 leading-relaxed">
          Thank you, <strong>{customer.name}</strong>. Abu Maaz Kirana supply desk will calculate the exact wholesale freight discount and share the official quotation on WhatsApp at <strong>{customer.phone}</strong>.
        </p>
        <div className="pt-6">
          <Link
            href="/kirana"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#0b2a1f] gold-gradient-bg"
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
                <h4 className="text-base font-serif font-bold text-[#0b2a1f]">
                  {language === "en" ? product.name_en : product.name_hi}
                </h4>
                <p className="text-xs text-gray-500">
                  Unit: {product.unit} | Rate: {formatINR(product.price)}
                </p>
                <p className="text-xs font-semibold text-[#b89326]">
                  Subtotal: {formatINR(product.price * quantity)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-1.5 hover:bg-gray-200 text-gray-600"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="p-1.5 hover:bg-gray-200 text-gray-600"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(product.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
            ℹ️ <strong>Wholesale Note:</strong> Final rates may include transport discounts or volume rebates. No immediate payment is required now.
          </div>
        </div>

        {/* Contact & Submission Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#d4af37]/30 shadow-lg space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#0b2a1f]">
              Delivery Details & Quote Request
            </h3>

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

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0b2a1f] gold-gradient-bg shadow hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-4 h-4 text-[#0b2a1f]" /> Submit Bulk Order Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
