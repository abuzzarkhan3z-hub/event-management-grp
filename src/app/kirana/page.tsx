"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { SAMPLE_KIRANA_PRODUCTS } from "@/lib/sampleData";
import { formatINR } from "@/lib/utils";
import { ShoppingBag, Check, Search, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function KiranaPage() {
  const { language } = useLanguage();
  const { addItem, totalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: "all", label_en: "All Products", label_hi: "सभी उत्पाद" },
    { id: "rice", label_en: "Rice & Basmati", label_hi: "चावल एवं बासमती" },
    { id: "oil_ghee", label_en: "Pure Ghee & Oils", label_hi: "शुद्ध घी व तेल" },
    { id: "atta_flour", label_en: "Flour & Atta", label_hi: "आटा व मैदा" },
    { id: "spices", label_en: "Whole Spices", label_hi: "साबुत मसाले" },
    { id: "dry_fruits", label_en: "Dry Fruits", label_hi: "मेवे (काजू/बादाम)" },
  ];

  const filteredProducts = SAMPLE_KIRANA_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const nameToMatch = (product.name_en + " " + product.name_hi).toLowerCase();
    const matchesSearch = nameToMatch.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: (typeof SAMPLE_KIRANA_PRODUCTS)[0]) => {
    addItem(product, product.min_qty);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#b89326]">
            {language === "en" ? "Bulk Kirana Supply" : "थोक किराना राशन"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0b2a1f]">
            {language === "en" ? "Wholesale Grocery Catalog" : "थोक किराना सामान"}
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl">
            {language === "en"
              ? "Premium bulk groceries for marriages, community feasts, hostels, and caterers. Select items, add to your order list, and get a wholesale quotation."
              : "शादी-ब्याह व आयोजनों के लिए थोक आटा, चावल, दालें, मसाले व तेल। सूची में जोड़ें और रियायती कोटेशन पाएं।"}
          </p>
        </div>

        {/* View Order List CTA */}
        <Link
          href="/kirana/order-list"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-[#0b2a1f] gold-gradient-bg shadow-md hover:brightness-105 transition-all self-start md:self-auto"
        >
          <ShoppingBag className="w-4 h-4 text-[#0b2a1f]" />
          <span>
            {language === "en" ? `View Order List (${totalItems})` : `ऑर्डर सूची (${totalItems})`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#0b2a1f] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {language === "en" ? cat.label_en : cat.label_hi}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === "en" ? "Search rice, ghee, spices..." : "चावल, घी, मसाले खोजें..."}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#0b2a1f] bg-white"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isAdded = addedIds[product.id];
          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-bold text-[#b89326] bg-[#d4af37]/10 px-2.5 py-0.5 rounded-full uppercase">
                  {product.unit}
                </span>

                <h3 className="text-lg font-serif font-bold text-[#0b2a1f]">
                  {language === "en" ? product.name_en : product.name_hi}
                </h3>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif font-bold text-[#0b2a1f]">
                    {formatINR(product.price)}
                  </span>
                  <span className="text-xs text-gray-500">approx. wholesale rate</span>
                </div>

                <p className="text-xs text-gray-500">
                  Minimum Order Quantity: <strong>{product.min_qty} unit(s)</strong>
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-6">
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-[#0b2a1f] text-white hover:bg-[#071c14] active:scale-95"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Order List
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-[#d4af37]" /> Add to Order List
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
